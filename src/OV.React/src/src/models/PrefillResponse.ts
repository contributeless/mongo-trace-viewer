export interface PrefillResponse {
    databases: DatabasePrefillModel[]
}

export interface DatabasePrefillModel {
    database: string;
    collections: string[];
}