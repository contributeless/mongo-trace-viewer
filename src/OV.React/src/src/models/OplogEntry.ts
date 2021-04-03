import { OplogOperationType } from "./OplogOperationType";

export interface OplogEntryModelBase {
    collectionName: string;
    operationType: OplogOperationType;
    entityId: string;
    operation: any
}

export interface OplogEntry  extends OplogEntryModelBase {
    actionDateTime: Date;
    timestamp: string;
    transactionId: string;
    childEntries: OplogChildEntryModel[]
}

export interface OplogChildEntryModel extends OplogEntryModelBase {
}
