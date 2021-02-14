import React from "react";
import { FavouriteFilter, FavouriteFiltersListModel } from "../models/FavouriteFiltersListModel";
import { Grid, GridColumnConfig } from "./Grid";
import "./favouriteFiltersList.styl"

const gridConfig:GridColumnConfig<FavouriteFilter>[] = [
    {
        title: "Action",
        value: x => <div></div>
    },
    {
        title: "Database",
        value: x => x.database
    },
    {
        title: "Collection",
        value: x => x.collection
    },
    {
        title: "Record id",
        value: x => x.recordId
    },
]

export interface FavouriteFiltersListProps {
    model: FavouriteFiltersListModel
}

export function FavouriteFiltersList(props: FavouriteFiltersListProps) {
    return <div className="favourite-filters-list__container">
        <Grid items={props.model.items} columns={gridConfig}></Grid>
    </div>
}