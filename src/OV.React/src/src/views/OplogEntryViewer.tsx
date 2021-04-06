import React from "react";
import ReactJson from "react-json-view";
import { OplogEntry, OplogEntryModelBase } from "../models/OplogEntry";
import { OplogOperationType } from "../models/OplogOperationType";
import { ActionButton } from "./form/ActionButton";

type OplogEntryProps = {
    entry: OplogEntry;
    selectedRecordId: string;
    selectedCollection: string;
};
type OplogEntryState = {
    isAccordionOpened: boolean;
    loadedChildEntriesCount: number;
    isAllTransactionOperationsShouldBeShown : boolean
};

export class OplogEntryViewer extends React.Component<OplogEntryProps, OplogEntryState> {
    
    constructor(props: OplogEntryProps) {
        super(props);
        this.state = {
            isAccordionOpened: false,
            loadedChildEntriesCount: 10,
            isAllTransactionOperationsShouldBeShown: false
        }
    }

    shouldComponentUpdate(nextProps: OplogEntryProps, nextState: OplogEntryState) {
        return nextProps.selectedCollection !== this.props.selectedCollection
         || nextProps.selectedRecordId !== this.props.selectedRecordId
         || nextProps.entry !== this.props.entry
         || nextState.isAccordionOpened !== this.state.isAccordionOpened
         || nextState.loadedChildEntriesCount !== this.state.loadedChildEntriesCount
         || nextState.isAllTransactionOperationsShouldBeShown !== this.state.isAllTransactionOperationsShouldBeShown
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
            actionString = <>Record with id <span className={`oplog-operation__entityid ${selectedEntityIdClass ?? ""}`}>{(operationInfo.entityId as any).id || operationInfo.entityId}</span> created</>;
        }
        if (operationInfo.operationType === OplogOperationType.update) {
            actionString = <>Record with id <span className={`oplog-operation__entityid ${selectedEntityIdClass ?? ""}`}>{(operationInfo.entityId as any).id || operationInfo.entityId}</span> updated</>;
        }
        if (operationInfo.operationType === OplogOperationType.delete) {
            actionString = <>Record with id <span className={`oplog-operation__entityid ${selectedEntityIdClass ?? ""}`}>{(operationInfo.entityId as any).id ||operationInfo.entityId}</span> deleted</>;
        }

        let collectionClass = null;

        if(operationInfo.collectionName == this.props.selectedCollection){
            collectionClass = "oplog__collection--highlight";
        }

        return <div className="oplog-operation">
            {!!operationInfo.collectionName && <h2 className={`oplog-operation__collection ${collectionClass}`}>{operationInfo.collectionName}</h2>}
            {!!actionString && <div className="oplog-operation__collection-action">{actionString}</div>}
            {changesMarkup}
        </div>
    } 

    loadMoreChildEntries = () => {
        this.setState({
            loadedChildEntriesCount: this.state.loadedChildEntriesCount + 10
        })
    }

    renderFullOplogOperation = (entry: OplogEntry) => {
        if (!!entry.childEntries && !!entry.childEntries.length) {

            const childEntries = entry.childEntries.filter(x => this.state.isAllTransactionOperationsShouldBeShown ||
                (!this.props.selectedCollection || this.props.selectedCollection === x.collectionName)
                && (!this.props.selectedRecordId || this.props.selectedRecordId === x.entityId)
                );

            return <div className="oplog-operation__multi-container">
                {childEntries.sort((x,y) => x.collectionName.localeCompare(y.collectionName)).filter((x, index) => index < this.state.loadedChildEntriesCount)
                    .map((x, index) => <div className="oplog-operation__multi-container-entry" key={index}>
                        {this.renderOplogOperation(x)}
                    </div>)}
                {(this.state.loadedChildEntriesCount < childEntries.length)
                    && <div className="oplog-operation__show-more-card">
                        <ActionButton label={`Show more`}
                            onClick={this.loadMoreChildEntries}
                            type="button" />
                        <div className="oplog-operation__show-more-card__operations-count">
                            Loaded {this.state.loadedChildEntriesCount} items. Total operations count {childEntries.length}.
                            </div>
                    </div>}
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

    getInvolvedCollections = (entry: OplogEntry): React.ReactNode[] => {
        let collectionNames = !!entry.childEntries && !!entry.childEntries.length
            ? entry.childEntries.map(x => x.collectionName)
            : (!!entry.collectionName ? [entry.collectionName] : []);

        if (!collectionNames.length) {
            collectionNames = ["System operation"];
        }

        return collectionNames.filter(this.onlyUnique)
            .sort()
            .map<React.ReactNode>((t, i) => <span key={i} className={`${t === this.props.selectedCollection ? "oplog__collection--highlight" : ""}`}>{t}</span>)
            .reduce((accu: React.ReactNode[], elem: React.ReactNode) => {
                return !accu.length ? [elem] : [...accu, ', ', elem]
            }, [])
    }

    onAccordionToggle = () => {
        this.setState({
            isAccordionOpened: !this.state.isAccordionOpened
        })
    }

    toggleAllOperations = () => {
        this.setState({
            isAllTransactionOperationsShouldBeShown: !this.state.isAllTransactionOperationsShouldBeShown
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
                <div className="oplog__item-operation oplog-operation__container">
                    <ActionButton label={this.state.isAllTransactionOperationsShouldBeShown
                        ? "Show only filtered operations"
                        : "Show all transaction operations"}
                        onClick={this.toggleAllOperations}
                        type="button"
                        className="oplog-operation__show-all-toggle" />
                    {this.renderFullOplogOperation(entry)}
                </div>
            </div>}
        </div>;
    }

    render() {
        return this.createEntryView(this.props.entry);
    };
}
