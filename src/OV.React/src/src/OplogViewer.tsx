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


type OplogEntryProps = {
    entry: OplogEntry;

};
type OplogEntryState = {
    isAccordionOpened: boolean;
};

export class OplogEntry extends React.Component<OplogEntryProps, OplogEntryState> {
    
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
            <span className="oplog-operation__collection-action">{actionString}</span>
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
                    <span className="oplog__item-collections">{this.getInvolvedCollections(entry)}</span>
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

export class OplogViewer extends React.Component<Props, State> {
    
 
    render() {
        const entries = this.props.entries.map((x, index) => <OplogEntry entry={x} key={index} />);

        return (
            <div className="oplog__container">
                {entries}
            </div>
        );
    };
}
