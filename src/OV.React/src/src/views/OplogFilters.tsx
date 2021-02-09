import React, { useRef } from "react";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";
import { OplogFilterContainer } from "../state/OplogFilterContainer";
import { ActionButton } from "./form/ActionButton";
import { Select } from "./form/Select";
import { TextInput } from "./form/TextInput";

export function OplogFilters() {
    return (
        <Subscribe to={[OplogFilterContainer, OplogContainer]}>
            {(filters:OplogFilterContainer, oplog: OplogContainer) => (
                <form onSubmit={(e: React.FormEvent) => {e.preventDefault(); oplog.reloadList()}}>
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