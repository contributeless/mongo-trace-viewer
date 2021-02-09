export interface OplogFilterModel {
    database: string;
    collection: string;
    recordId: string | null;
}