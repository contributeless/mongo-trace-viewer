import React from "react";
import FavouriteIcon from "./icons/favourite.svg";
import FavouriteEmptyIcon from "./icons/favourite_empty.svg";
import "./favouritesToggle.styl";
import { Tooltip } from "./Tooltip";

export interface FavouritesToggleProps {
    isEnabled: boolean,
    onClick: () => void
}

export function FavouritesToggle(props: FavouritesToggleProps) {
    const icon = props.isEnabled ? <FavouriteIcon className="favourite-icon"></FavouriteIcon>
        : <FavouriteEmptyIcon className="favourite-empty-icon"></FavouriteEmptyIcon>

    return <Tooltip text={props.isEnabled ? "Remove from favourites" : "Add to favourites"}>
        <div className="favourites-toggle" onClick={props.onClick}>
            {icon}
        </div>
    </Tooltip>
} 