import { OplogFilterModel } from "../models/OplogFilterModel";
import { LocalStorageProvider } from "./LocalStorageProvider";

export class FavouriteFilterService {

    private static readonly favouriteFilterLSKey = "favouriteFilterLSKey";

    public static saveFilters(filters: OplogFilterModel[]){
        LocalStorageProvider.save(FavouriteFilterService.favouriteFilterLSKey, filters);
    }
    public static loadFilters(): OplogFilterModel[] | null{
        return LocalStorageProvider.get<OplogFilterModel[]>(FavouriteFilterService.favouriteFilterLSKey);
    }
}