import { OplogFilterModel } from "../models/OplogFilterModel";
import { LocalStorageProvider } from "./LocalStorageProvider";

export interface PagingOptions{
    pageSize: number
}

export class FilterService {

    private static readonly favouriteFilterLSKey = "favouriteFilterLSKey";
    private static readonly searchFilterLSKey = "searchFilterLSKey";
    private static readonly pagingOptionsLSKey = "pagingOptionsLSKey";

    public static saveFavouriteFilters(filters: OplogFilterModel[]){
        LocalStorageProvider.save(FilterService.favouriteFilterLSKey, filters);
    }

    public static loadFavouriteFilters(): OplogFilterModel[] | null{
        return LocalStorageProvider.get<OplogFilterModel[]>(FilterService.favouriteFilterLSKey);
    }

    public static saveSearchFilter(filter: OplogFilterModel) {
        LocalStorageProvider.save(FilterService.searchFilterLSKey, filter);
    }

    public static loadSearchFilter(): OplogFilterModel | null {
        return LocalStorageProvider.get<OplogFilterModel>(FilterService.searchFilterLSKey);
    }

    public static savePagingOptions(options: PagingOptions){
        LocalStorageProvider.save(FilterService.pagingOptionsLSKey, options);
    } 
    
    public static loadPagingOptions(): PagingOptions | null {
        return LocalStorageProvider.get<PagingOptions>(FilterService.pagingOptionsLSKey);
    }


}