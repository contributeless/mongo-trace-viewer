import React from "react";
import ReactJson from "react-json-view";
import { OplogEntry, OplogEntryModelBase } from "../models/OplogEntry";
import { OplogOperationType } from "../models/OplogOperationType";

type OplogEntryProps = {
    entry: OplogEntry;

};
type OplogEntryState = {
    isAccordionOpened: boolean;
};

export class OplogEntryViewer extends React.Component<OplogEntryProps, OplogEntryState> {
    
    constructor(props: OplogEntryProps) {
        super(props);
        this.state = {
            isAccordionOpened: false
        }
    }

    renderOplogOperation = (operationInfo: OplogEntryModelBase) => {
        let changesMarkup = null;
        if (operationInfo.operationType === OplogOperationType.insert
            || operationInfo.operationType === OplogOperationType.update) {
            changesMarkup = <div className="oplog-operation__changes-container">
                <span className="oplog-operation__changes-label">Changes:</span>
                <ReactJson src={operationInfo.operation} name={null} displayDataTypes={false} sortKeys={true} collapsed={true} />
            </div>
        }

        let actionString = null;

        if(operationInfo.operationType === OplogOperationType.insert){
            actionString = <>Record with id <span className="oplog-operation__entityid">{operationInfo.entityId}</span> created</>;
        }
        if(operationInfo.operationType === OplogOperationType.update){
            actionString = <>Record with id <span className="oplog-operation__entityid">{operationInfo.entityId}</span> updated</>;
        }
        if(operationInfo.operationType === OplogOperationType.delete){
            actionString = <>Record with id <span className="oplog-operation__entityid">{operationInfo.entityId}</span> deleted</>;
        }

        return <div className="oplog-operation">
            <h2 className="oplog-operation__collection">{operationInfo.collectionName}</h2>
            <div className="oplog-operation__collection-action">{actionString}</div>
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

    getInvolvedCollections = (entry:OplogEntry): string => {
        return !!entry.childEntries && !!entry.childEntries.length
            ? entry.childEntries.map(x => x.collectionName).join(", ")
            : entry.collectionName;
    }

    onAccordionToggle = () => {
        this.setState({
            isAccordionOpened: !this.state.isAccordionOpened
        })
    }

    createEntryView = (entry: OplogEntry) => {
        const actionDate = new Date(entry.actionDateTime);
        return <div className="oplog__item">
            <div className="oplog__item-header">
                <div className="oplog__item-header-main-info">
                    <span className="oplog__item-date">{actionDate.toLocaleString()}</span>
                    <span className="oplog__item-transaction">{!!entry.transactionId ? `Transaction №: ${entry.transactionId}` : "No transaction"}</span>
                </div>
                <div className="oplog__item-header-additional-info">
                    <div className="oplog__item-collections">{this.getInvolvedCollections(entry)}</div>
                </div>
                <div className={`oplog__item-header-toggle ${this.state.isAccordionOpened ? "oplog__item-header-toggle--opened": ""}`} onClick={this.onAccordionToggle}>
                    <i></i>
                </div>
            </div>
            {!!this.state.isAccordionOpened && <div className="oplog__item-content">
                <div className="oplog__item-operation oplog-operation__container">{this.renderFullOplogOperation(entry)}</div>
            </div>}
        </div>;
    }

    render() {
        return this.createEntryView(this.props.entry);
    };
}
