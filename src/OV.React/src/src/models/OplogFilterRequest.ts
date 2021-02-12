import { PagingModel } from "./PagingModel";

export interface OplogFilterRequest {
    database: string | null;
    collection: string | null;
    recordId: string | null;
    maxTimestamp: string | null;

    paging: PagingModel;
}