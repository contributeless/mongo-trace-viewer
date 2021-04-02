import React from "react";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";
import { OplogFilterContainer } from "../state/OplogFilterContainer";
import { FavouritesIconsGroup } from "./FavouritesIconsGroup";
import { ActionButton } from "./form/ActionButton";
import { ButtonsGroup } from "./form/ButtonsGroup";
import { DateTimePicker } from "./form/DateTimePicker";
import { InputGroup } from "./form/InputGroup";
import { Select } from "./form/Select";
import { TextInput } from "./form/TextInput";

import { Tooltip } from "./Tooltip";


export function OplogFilters() {
    
    
    return (
        <Subscribe to={[OplogFilterContainer, OplogContainer]}>
            {(filters: OplogFilterContainer, oplog: OplogContainer) => (
                <>
                    <FavouritesIconsGroup></FavouritesIconsGroup>
                    <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); oplog.startNewSearch() }} autoComplete="off">
                        <InputGroup className="oplog-filters-group">
                            <Select name="databaseName" onChange={filters.setDatabase} pleaseSelectLabel="Please select..." value={filters.searchFilter.database} options={filters.getDatabaseOptions()} label="Database:" />
                            <Select name="collectionName" onChange={filters.setCollection} pleaseSelectLabel="Please select..." value={filters.searchFilter.collection} options={filters.getCollectionOptions()} label="Collection:" />
                            <TextInput name="recordId" onChange={filters.setRecordId} value={filters.searchFilter.recordId} label="Record id:" />
                            <DateTimePicker name="startDate" onChange={filters.setStartDate} value={filters.searchFilter.startDate} label={"Min date:"}></DateTimePicker>
                            <DateTimePicker name="endDate" onChange={filters.setEndDate} value={filters.searchFilter.endDate} label={"Max date:"}></DateTimePicker>
                        </InputGroup>
                        <ButtonsGroup className="oplog-filters-buttons-group">
                            <Tooltip disabled={filters.isSearchAndCurrentFilterTheSame()} text={"The filter has been changed. Click to apply"} >
                                <div className={`oplog-filters__find-btn-wrapper ${filters.isSearchAndCurrentFilterTheSame() ? "" : "oplog-filters__find-btn-diff"}`}>
                                    <ActionButton label="Find" type='submit' />
                                </div>
                            </Tooltip>
                        </ButtonsGroup>
      
                    </form>
                </>
            )}
        </Subscribe>
    );
}