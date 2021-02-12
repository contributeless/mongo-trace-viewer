import React, { useRef } from "react";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";
import { OplogFilterContainer } from "../state/OplogFilterContainer";
import { ActionButton } from "./form/ActionButton";
import { ButtonsGroup } from "./form/ButtonsGroup";
import { InputGroup } from "./form/InputGroup";
import { Select } from "./form/Select";
import { TextInput } from "./form/TextInput";

export function OplogFilters() {
    return (
        <Subscribe to={[OplogFilterContainer, OplogContainer]}>
            {(filters:OplogFilterContainer, oplog: OplogContainer) => (
                <form onSubmit={(e: React.FormEvent) => {e.preventDefault(); oplog.reloadList()}}>
                    <InputGroup className="oplog-filters-group">
                        <Select name="databaseName" onChange={filters.setDatabase} pleaseSelectLabel="Please select..." value={filters.currentFilter.database} options={filters.getDatabaseOptions()} label="Database:" />
                        <Select name="collectionName" onChange={filters.setCollection} pleaseSelectLabel="Please select..." value={filters.currentFilter.collection} options={filters.getCollectionOptions()} label="Collection:" />
                        <TextInput name="recordId" onChange={filters.setRecordId} value={filters.currentFilter.recordId} label="Record id:" />
                    </InputGroup>
                    <ButtonsGroup className="oplog-filters-buttons-group">
                        <ActionButton label="Find" type='submit'  />
                        <ActionButton label="Save filter" onClick={filters.saveCurrentFilterToFavourites} type='button' />
                    </ButtonsGroup>
                </form>
            )}
        </Subscribe>
    );
}