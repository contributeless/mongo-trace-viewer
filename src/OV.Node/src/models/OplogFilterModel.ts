import { PagingModel } from "./PagingModel";

export interface OplogFilterModel {
    database: string;
    collection: string;
    recordId: string | null;
    maxTimestamp: string | null;
    paging: PagingModel;
}