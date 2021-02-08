import React from "react";
import { Select } from "./form/Select";
import { TextInput } from "./form/TextInput";

export function OplogFilters() {
    const [db, setDb] = React.useState("");
    const [collection, setCollection] = React.useState("");
    const [recordId, setRecordId] = React.useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    //   api.login(email, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Select name="databaseName" onChange={setDb} pleaseSelectLabel="Please select..." value={db} options={[]} label="Database:"/>
            <Select name="collectionName" onChange={setCollection} pleaseSelectLabel="Please select..." value={collection} options={[]} label="Collection:"/>
            <TextInput name="recordId" onChange={setRecordId} value={recordId} label="Record id:"/>
        </form>
    );
}