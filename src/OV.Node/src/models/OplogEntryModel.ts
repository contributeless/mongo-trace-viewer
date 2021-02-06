import { OplogOperationType } from "./OplogOperationType";

export interface OplogEntryModelBase {
    collectionName: string;
    operationType: OplogOperationType;
    entityId: string;
    operation: any
}

export interface OplogEntryModel extends OplogEntryModelBase {
    actionDateTime: Date;
    transactionId: string;
    childEntries: OplogChildEntryModel[]
}

export interface OplogChildEntryModel extends OplogEntryModelBase {
}