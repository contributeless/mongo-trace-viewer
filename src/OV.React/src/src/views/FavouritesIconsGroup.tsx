import React from "react";
import { useState } from "react";
import { FavouritesToggle } from "./FavouritesToggle";
import FavouritesListIcon from "./icons/favourites_list.svg";
import "./favouritesIconsGroup.styl";
import { Tooltip } from "./Tooltip";
import { Modal } from "./Modal";
import { FavouriteFiltersList } from "./FavouriteFiltersList";
import { Subscribe } from "unstated";
import { OplogFilterContainer } from "../state/OplogFilterContainer";

export function FavouritesIconsGroup() {
    const [isPopupOpened, setIsPopupOpened] = useState(false);

    return <Subscribe to={[OplogFilterContainer]}>
        {(filters: OplogFilterContainer) => (
            <div className="favourite-icons-group">
                <FavouritesToggle isEnabled={filters.isSearchFilterFromFavourites()} onClick={filters.toggleFavouriteFilter}></FavouritesToggle>
                <Tooltip text="Show favourites">
                    <div className="favourites-list-icon__wrapper">
                        <FavouritesListIcon className="favourites-list-icon" onClick={() => setIsPopupOpened(true)}></FavouritesListIcon>
                    </div>
                </Tooltip>
                <Modal isOpened={isPopupOpened} onClose={() => setIsPopupOpened(false)}>
                    <div className="favourite-filter__popup-container">
                        <h1>Favourite filters</h1>
                        <FavouriteFiltersList
                            model={({ items: filters.state.favouriteFilters })}
                            onDelete={filters.deleteFavouriteFilter}
                            onSelect={filters.setSearchFilterFromFavourites} />
                    </div>
                </Modal>
            </div>
        )}
    </Subscribe>
}