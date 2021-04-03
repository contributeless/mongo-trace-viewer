export interface OplogFilterModel {
    database: string | "";
    collection: string | "";
    recordId: string | "";
    filterId: string | "";
    startDate: Date | null;
    endDate: Date | null;
    showFullTransactionLog: boolean;
}