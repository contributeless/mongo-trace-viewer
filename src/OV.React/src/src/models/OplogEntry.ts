import { OplogOperationType } from "./OplogOperationType";

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
