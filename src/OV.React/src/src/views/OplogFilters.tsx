import React, { useRef } from "react";
import { Subscribe } from "unstated";
import { OplogFilterContainer } from "../state/OplogFilterContainer";
import { ActionButton } from "./form/ActionButton";
import { Select } from "./form/Select";
import { TextInput } from "./form/TextInput";

export function OplogFilters() {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(e);
    //   api.login(email, password);
    }
    
    return (
        
        <Subscribe to={[OplogFilterContainer]}>
            {(filters:OplogFilterContainer) => (
                <form onSubmit={handleSubmit}>
                    <Select name="databaseName" onChange={filters.setDatabase} pleaseSelectLabel="Please select..." value={filters.currentFilter.database} options={filters.getDatabaseOptions()} label="Database:" />
                    <Select name="collectionName" onChange={filters.setCollection} pleaseSelectLabel="Please select..." value={filters.currentFilter.collection} options={filters.getCollectionOptions()} label="Collection:" />
                    <TextInput name="recordId" onChange={filters.setRecordId} value={filters.currentFilter.recordId} label="Record id:" />
                
                    <ActionButton label="Find" type='submit'  />
                    <ActionButton label="Save filter" onClick={filters.saveCurrentFilterToFavourites} type='button' />
                </form>
            )}
        </Subscribe>
    );
}