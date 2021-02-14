import { OplogFilterModel } from "./OplogFilterModel";

export interface FavouriteFiltersListModel {
    items: FavouriteFilter[]
}

export interface FavouriteFilter extends OplogFilterModel {

}