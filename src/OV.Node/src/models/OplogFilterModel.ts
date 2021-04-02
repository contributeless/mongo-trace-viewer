import { PagingModel } from "./PagingModel";

export interface OplogFilterModel {
    database: string;
    collection: string;
    recordId: string | null;
    maxTimestamp: string | null;
    minTimestamp: string | null;
    startDate: Date | null;
    endDate: Date | null;
    paging: PagingModel;
}