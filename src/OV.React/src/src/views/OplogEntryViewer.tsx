import React from "react";
import ReactJson from "react-json-view";
import { OplogEntry, OplogEntryModelBase } from "../models/OplogEntry";
import { OplogOperationType } from "../models/OplogOperationType";

type OplogEntryProps = {
    entry: OplogEntry;
    selectedRecordId: string;
    selectedCollection: string;
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
            || operationInfo.operationType === OplogOperationType.update
            || operationInfo.operationType === OplogOperationType.unknown
            || operationInfo.operationType === OplogOperationType.command
            ) {
            changesMarkup = <div className="oplog-operation__changes-container">
                <span className="oplog-operation__changes-label">Changes:</span>
                <ReactJson src={operationInfo.operation} name={null} displayDataTypes={false} sortKeys={true} collapsed={true} />
            </div>
        }


        let selectedEntityIdClass = null;
        if(!!operationInfo.entityId && !!this.props.selectedRecordId){
            if(operationInfo.entityId === this.props.selectedRecordId){
                selectedEntityIdClass = "operation__entityid--highlight";
            }
        }

        let actionString = null;

        if (operationInfo.operationType === OplogOperationType.insert) {
            actionString = <>Record with id <span className={`oplog-operation__entityid ${selectedEntityIdClass ?? ""}`}>{operationInfo.entityId}</span> created</>;
        }
        if (operationInfo.operationType === OplogOperationType.update) {
            actionString = <>Record with id <span className={`oplog-operation__entityid ${selectedEntityIdClass ?? ""}`}>{operationInfo.entityId}</span> updated</>;
        }
        if (operationInfo.operationType === OplogOperationType.delete) {
            actionString = <>Record with id <span className={`oplog-operation__entityid ${selectedEntityIdClass ?? ""}`}>{operationInfo.entityId}</span> deleted</>;
        }

        let collectionClass = null;

        if(operationInfo.collectionName == this.props.selectedCollection){
            collectionClass = "oplog__collection--highlight";
        }

        return <div className="oplog-operation">
            <h2 className={`oplog-operation__collection ${collectionClass}`}>{operationInfo.collectionName}</h2>
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
    
    onlyUnique = (value: string, index: number, self: string[]) => {
        return self.indexOf(value) === index;
    }

    getInvolvedCollections = (entry:OplogEntry): React.ReactNode[] => {
        let collectionNames = !!entry.childEntries && !!entry.childEntries.length
            ? entry.childEntries.map(x => x.collectionName).sort()
            : (!!entry.collectionName ? [entry.collectionName] : []);

        if(!collectionNames.length){
            collectionNames = ["System operation"];
        }

        return collectionNames.filter(this.onlyUnique)
        .map<React.ReactNode>((t, i) => <span key={i} className={`${t === this.props.selectedCollection ? "oplog__collection--highlight": "" }`}>{t}</span>)
         .reduce((accu: React.ReactNode[], elem: React.ReactNode) => {
            return !accu.length ? [elem] : [...accu, ', ', elem]
        }, [])
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
