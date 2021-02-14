import React, { useState } from "react";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";
import { OplogFilterContainer } from "../state/OplogFilterContainer";
import { FavouriteFiltersList } from "./FavouriteFiltersList";
import { ActionButton } from "./form/ActionButton";
import { ButtonsGroup } from "./form/ButtonsGroup";
import { InputGroup } from "./form/InputGroup";
import { Select } from "./form/Select";
import { TextInput } from "./form/TextInput";
import { Modal } from "./Modal";

export function OplogFilters() {
    const [isPopupOpened, setIsPopupOpened] = useState(false);
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
                        <ActionButton label="Show favourites" onClick={() => setIsPopupOpened(true)} type='button' />
                    </ButtonsGroup>
                    <Modal isOpened={isPopupOpened} onClose={() => setIsPopupOpened(false)}>
                        <div className="favourite-filter__popup-container">
                            <h1>Favourite filters</h1>
                            <FavouriteFiltersList model={({items: filters.state.favouriteFilters})}></FavouriteFiltersList>
                        </div>
                        
                    </Modal>
                </form>
            )}
        </Subscribe>
    );
}