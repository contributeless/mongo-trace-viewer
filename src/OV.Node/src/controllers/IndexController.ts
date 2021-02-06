import { NextFunction, Request, Response } from 'express';
import { ChildOplogEntryEntity, OplogEntryEntity, OplogEntryEntityBase, OplogEntryOperation, OplogEntryTransactionOperation } from '../Entities/OplogEntryEntity';
import { OplogChildEntryModel, OplogEntryModel, OplogEntryModelBase } from '../models/OplogEntryModel';
import { OplogFilterModel } from '../models/OplogFilterModel';
import { OplogOperationType } from '../models/OplogOperationType';
import ResponseUtils from '../utils/ResponseUtils';

class IndexController {
  public index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filter: OplogFilterModel = req.body;

      const mongoClient = ResponseUtils.getMongoConnection(res);

      const result: OplogEntryEntity[] = await mongoClient.db("local").collection<OplogEntryEntity>('oplog.rs').find({
        $or: [
          {ns: `${filter.database}.${filter.collection}`},
          {
            ns: "admin.$cmd",
            "o.applyOps.ns":  `${filter.database}.${filter.collection}`
          }
        ]
      }, {
        limit:3,
        // sort: {
        //   ts: -1
        // },

      }).toArray();

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
        collectionName: dbEntry.ns,
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

      const configs = [];

      for(var i=0; i < databases.databases.length; i++){
        const db = databases.databases[i];
        const dbConnect = mongoClient.db(db.name, {returnNonCachedInstance: true});
        const collections = await dbConnect.listCollections({}, {nameOnly: true}).toArray();
        configs.push({
          database: db.name,
          collections: collections.map(x => x.name)
        })
      }

      res.json({
        databases: configs
      });
      
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
