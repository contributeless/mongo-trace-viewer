import { AnyTxtRecord } from "dns";
import { Timestamp } from "mongodb";

export interface OplogEntryEntityBase {
    ns: "admin.$cmd" | string;
    op: "c" | "i" | "u" | "d" | "n";
    o2: OplogEntryOperation2,
    o: OplogEntryOperation | OplogEntryTransactionOperation
}

export interface OplogEntryEntity extends OplogEntryEntityBase {
    ts: Timestamp;
    o: OplogEntryOperation | OplogEntryTransactionOperation,
    txnNumber: number
}

export interface OplogEntryOperation2 {
    _id: string;
}

export type OplogEntryOperation = any;

export interface OplogEntryTransactionOperation {
    applyOps: ChildOplogEntryEntity[]
}

export interface ChildOplogEntryEntity extends OplogEntryEntityBase {
    o: OplogEntryOperation
}