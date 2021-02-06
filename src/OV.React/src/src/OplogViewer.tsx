import * as React from 'react';
import ReactJson from 'react-json-view'
import { OplogOperationType } from './models/OplogOperationType';
import './oplog.styl'
export interface OplogEntry  extends OplogEntryModelBase {
    actionDateTime: Date;
    transactionId: string;
    childEntries: OplogChildEntryModel[]
}
export interface OplogEntryModelBase {
    collectionName: string;
    operationType: OplogOperationType;
    entityId: string;
    operation: any
}

export interface OplogChildEntryModel extends OplogEntryModelBase {
}

type Props = {
    entries: OplogEntry[]
};
type State = {

};

export class OplogViewer extends React.Component<Props, State> {
    
    renderOplogOperation = (operationInfo: OplogEntryModelBase) => {
        let changesMarkup = null;
        if (operationInfo.operationType === OplogOperationType.delete) {
            changesMarkup = <div className="oplog-operation__deleted">
                {operationInfo.entityId} deleted
            </div>
        } else if (operationInfo.operationType === OplogOperationType.insert
            || operationInfo.operationType === OplogOperationType.update) {
            changesMarkup = <div className="oplog-operation__changes-container">
                <ReactJson src={operationInfo.operation} name={null} displayDataTypes={false} sortKeys={true} collapsed={true} />
            </div>
        }

        return <div className="oplog-operation">
            <div className="oplog-operation__collection">{operationInfo.collectionName}</div>
            {changesMarkup}
        </div>
    } 

    renderFullOplogOperation = (entry: OplogEntry) => {
        if (!!entry.childEntries && !!entry.childEntries.length) {
            return <div className="oplog-operation__multi-container">
                {entry.childEntries.map((x, index) => <div className="oplog-operation__multi-container-entry" key={index}>
                    {this.renderOplogOperation(x)}
                </div>)}

            </div>
        } else {
            return <div className="oplog-operation__single-container">
                {this.renderOplogOperation(entry)}
            </div>
        }
    }

    createEntryView = (entry:OplogEntry, index: number) => {
      return <div className="oplog__item" key={index}>
          <div className="oplog__item-date">{entry.actionDateTime}</div>
          <div className="oplog__item-transaction">{entry.transactionId ?? "No transaction"}</div>
          <div className="oplog__item-operation oplog-operation__container">{}</div>
          {this.renderFullOplogOperation(entry)}
      </div>;
    }

    render() {
        const entries = this.props.entries.map(this.createEntryView);

        return (
            <div className="oplog__container">
                {entries}
            </div>
        );
    };
}
