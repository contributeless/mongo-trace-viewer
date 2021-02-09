export interface OplogFilterRequest {
    database: string | null;
    collection: string | null;
    recordId: string | null;
}