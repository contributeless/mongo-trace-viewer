import React from "react";
import { FavouriteFilter, FavouriteFiltersListModel } from "../models/FavouriteFiltersListModel";
import { Grid, GridColumnConfig } from "./Grid";
import "./favouriteFiltersList.styl"
import { DeleteGridButton, SelectGridButton } from "./form/GridButtons";
import { Tooltip } from "./Tooltip";


export interface FavouriteFiltersListProps {
    model: FavouriteFiltersListModel,
    onSelect: (filterId: string) => void,
    onDelete: (filterId: string) => void,
}

export function FavouriteFiltersList(props: FavouriteFiltersListProps) {

    const gridConfig:GridColumnConfig<FavouriteFilter>[] = [
        {
            title: "Action",
            value: x => <div>
                <Tooltip text="Pick the filter">
                    <div className="favourite-filters-list__btn-container">
                        <SelectGridButton className="favourite-filters-list__select-btn" onClick={() => props.onSelect(x.filterId)} />
                    </div>
                </Tooltip>
                <Tooltip text="Delete the filter">
                    <div className="favourite-filters-list__btn-container">
                        <DeleteGridButton onClick={() => props.onDelete(x.filterId)} />
                    </div>
                </Tooltip>
            </div>
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
        {
            title: "Min date",
            value: x => x.startDate?.toLocaleString()
        },
        {
            title: "Max date",
            value: x => x.endDate?.toLocaleString()
        },
    ]
    


    return <div className="favourite-filters-list__container">
        <Grid items={props.model.items} columns={gridConfig}></Grid>
    </div>
}