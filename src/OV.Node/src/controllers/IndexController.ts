import { NextFunction, Request, Response } from 'express';
import { CollectionAggregationOptions, ObjectID, Timestamp } from 'mongodb';
import { ChildOplogEntryEntity, OplogEntryEntity, OplogEntryEntityBase, OplogEntryOperation, OplogEntryTransactionOperation } from '../Entities/OplogEntryEntity';
import { OplogChildEntryModel, OplogEntryModel, OplogEntryModelBase } from '../models/OplogEntryModel';
import { OplogFilterModel } from '../models/OplogFilterModel';
import { OplogOperationType } from '../models/OplogOperationType';
import { PagingModel } from '../models/PagingModel';
import ResponseUtils from '../utils/ResponseUtils';

class IndexController {

  private getDefaultPaging = () =>  {
    return {
      ascending: true,
      orderBy: "ts",
      pageNumber: 1,
      pageSize: 10,
    } as PagingModel;
  }

  private getMinDateFilter = (filter: OplogFilterModel) => {
    return !!filter.startDate ?
      {
        wall: {
          $gte: new Date(filter.startDate)
        }
      }
      : null;
  }
  
  private getMaxDateFilter = (filter: OplogFilterModel) => {
    return !!filter.endDate ?
      {
        wall: {
          $lte: new Date(filter.endDate)
        }
      }
      : null;
  }

  
  private getMinTSFilter = (filter: OplogFilterModel) => {
    return !!filter.minTimestamp ? {
      ts: {
        $gt : Timestamp.fromString(filter.minTimestamp)
      }
    }: null;
  }

  private getMaxTSFilter = (filter: OplogFilterModel) => {
    return !!filter.maxTimestamp ? {
      ts: {
        $lt: Timestamp.fromString(filter.maxTimestamp)
      }
    } : null;
  }

  private getOrderByClause = (paging: PagingModel) => {
    const orderByClause = {};
    orderByClause[paging.orderBy] = paging.ascending ? 1 : -1;

    return orderByClause;
  }

  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter: OplogFilterModel = req.body;

      const paging = filter.paging ?? this.getDefaultPaging();

      const mongoClient = ResponseUtils.getMongoConnection(res);


      let namespaceFilter = null;

      if (!!filter.database && !!filter.collection) {
        namespaceFilter = `${filter.database}.${filter.collection}`;
      } else if (!!filter.database) {
        namespaceFilter = { $regex: new RegExp(`^${filter.database}\..+`) };
      }

      const id = !!filter.recordId ? (ObjectID.isValid(filter.recordId) ? new ObjectID(filter.recordId) : filter.recordId) : null;
      

      const recordIdNamespaceFilter = {
        $and: [
          namespaceFilter ? { ns: namespaceFilter } : {},
          id ? {
            $or: [
              { "o2._id": id },
              { "o._id": id },
            ]
          } : {}
        ]
      }

      const recordIdNamespaceWithInnerEntriesFilter = {
        $or: [
          recordIdNamespaceFilter,
          {
            ns: "admin.$cmd",
            "o.applyOps": {
              "$elemMatch": recordIdNamespaceFilter
            },
          }
        ]
      };

      const result: OplogEntryEntity[] = await mongoClient.db("local").collection<OplogEntryEntity>('oplog.rs').aggregate([{
        $match: {
          $and: [
            {...(this.getMinTSFilter(filter))},
            {...(this.getMaxTSFilter(filter))},
            {...(this.getMinDateFilter(filter))},
            {...(this.getMaxDateFilter(filter))},
            recordIdNamespaceWithInnerEntriesFilter ?? {},
          ]
        }
      },
      {
        $sort: this.getOrderByClause(paging)
      },
      {
        $skip: (paging.pageNumber - 1) * paging.pageSize,
      },
      {
        $limit: paging.pageSize,
      }
      ], 
      {
        allowDiskUse: true
      } as CollectionAggregationOptions).toArray()

      res.json({
        items: result.map(this.prepareOplogBeforeView)
      });

    } catch (error) {
      next(error);
    }
  };

  private prepareOplogBeforeView = (entry: OplogEntryEntity) : OplogEntryModel => {
    let result = {} as OplogEntryModel;

    result = this.prepareBaseOplogBeforeView(entry, result);

    return {
      actionDateTime: !entry.ts ? undefined : new Date(entry.ts.getHighBits() * 1000),
      timestamp: entry.ts.toString(),
      transactionId: entry.txnNumber?.toString() ?? null,
      childEntries: this.getChildEntries(entry.o),
      ...result
    }
  }

  private prepareBaseOplogBeforeView = <TDbEntry extends OplogEntryEntityBase, TEntry extends OplogEntryModelBase>(dbEntry: TDbEntry, entry: TEntry) : TEntry => {
    const operationType: OplogOperationType = this.getOperationType(dbEntry.op);
    let entityId: string = null;
    if (operationType == OplogOperationType.command){
      entityId = null;
    } else {
      entityId = dbEntry.o2?._id ?? dbEntry?.o?._id;
    }

    return {
      ...entry,
      ...{
        collectionName: dbEntry.ns.replace(/^.+?\./, ''),
        operationType: operationType,
        entityId: entityId,
        operation: this.isCommandOperation(dbEntry.o) ? null : dbEntry.o
      }
    }
  }

  private isCommandOperation = (operation:  OplogEntryOperation | OplogEntryTransactionOperation) : operation is OplogEntryTransactionOperation => {
    return operation.applyOps !== undefined;
  }

  private getChildEntries = (operation: OplogEntryOperation | OplogEntryTransactionOperation): OplogChildEntryModel[] => {
    if(this.isCommandOperation(operation)) {
      return operation.applyOps.map(this.prepareChildOplogEntryBeforeView)
    }

    return [];
  }

  private prepareChildOplogEntryBeforeView = (entry: ChildOplogEntryEntity) : OplogChildEntryModel => {
    let result = {} as OplogChildEntryModel;

    result = this.prepareBaseOplogBeforeView(entry, result);

    return {
      ...result
    }
  }

  private getOperationType = (mongoOpType: string): OplogOperationType =>{
    switch(mongoOpType) {
      case "c" : return OplogOperationType.command;
      case "i" : return OplogOperationType.insert;
      case "u" : return OplogOperationType.update;
      case "d" : return OplogOperationType.delete;
      case "n" : return OplogOperationType.unknown;
    }
  }

  public filtersPrefill = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const mongoClient = ResponseUtils.getMongoConnection(res);

      var adminDb = mongoClient.db("local").admin();
      // List all the available databases
      const databases: any = await adminDb.listDatabases({nameOnly: true});

      let configs = [];

      for(var i=0; i < databases.databases.length; i++){
        const db = databases.databases[i];
        const dbConnect = mongoClient.db(db.name, {returnNonCachedInstance: true});
        const collections = await dbConnect.listCollections({}, {nameOnly: true}).toArray();
        configs.push({
          database: db.name,
          collections: collections.map(x => x.name)
        })
      }

      configs = configs.filter(x => x.database != "admin" && x.database != "config" &&  x.database != "local" );

      res.json({
        databases: configs
      });
      
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
