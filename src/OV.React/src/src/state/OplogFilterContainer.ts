import { OplogFilterModel } from "../models/OplogFilterModel";
import { DatabasePrefillModel } from "../models/PrefillResponse";
import { FilterService } from "../services/FilterService";
import { OplogService } from "../services/OplogService";
import { SelectItem } from "../views/form/Select";
import { BaseContainer } from "./BaseContainer";
import { ServiceContainer } from "./ServiceContainer";

export interface OplogFilterContainerState {
    currentFilter: OplogFilterModel;
    searchFilter: OplogFilterModel;
    favouriteFilters: OplogFilterModel[];
    databaseOptions: DatabasePrefillModel[];
}

export class OplogFilterContainer extends BaseContainer<OplogFilterContainerState> {
    state: OplogFilterContainerState = {
        currentFilter: {
            collection: "",
            database: "",
            recordId: "",
            filterId: "",
            startDate: null,
            endDate: null,
            showFullTransactionLog: false
        },
        searchFilter: {
            collection: "",
            database: "",
            recordId: "",
            filterId: "",
            startDate: null,
            endDate: null,
            showFullTransactionLog: false
        },
        favouriteFilters: [],
        databaseOptions: []
    };

    constructor(serviceContainer: ServiceContainer){
        super(serviceContainer);
    }

    initialize = async (): Promise<void> => {
        const prefillResponse = await this.makeRequest(() => OplogService.prefill());
        const favouriteFilters = FilterService.loadFavouriteFilters()
        ?.map(x => {
            return {
                ...x,
                startDate: x.startDate ? new Date(x.startDate) : null,
                endDate: x.endDate ? new Date(x.endDate) : null
            }
        });
        
        const searchFilter = FilterService.loadSearchFilter() ?? this.state.searchFilter;

        await this.setState({
            databaseOptions: prefillResponse.databases,
            favouriteFilters: favouriteFilters ?? [],
            searchFilter: {
                ...searchFilter, 
                startDate: searchFilter.startDate ? new Date(searchFilter.startDate) : null,
                endDate: searchFilter.endDate ? new Date(searchFilter.endDate) : null
            }
        });

        this.subscribe(this.onStateChange)
    };

    onStateChange = ()=> {
        FilterService.saveFavouriteFilters(this.state.favouriteFilters);
        FilterService.saveSearchFilter(this.state.searchFilter);
    }

    applySearchFilter = () => {
        return this.setState({
            currentFilter: {
                ...this.searchFilter
            }
        })
    }

    isSearchFilterFromFavourites = () => {
        return !!this.state.favouriteFilters.find(x => x.filterId === this.searchFilter.filterId);
    }

    isSearchAndCurrentFilterTheSame = () => {
        return this.searchFilter.collection === this.currentFilter.collection
        && this.searchFilter.database === this.currentFilter.database
        && this.searchFilter.recordId === this.currentFilter.recordId
    }


    getDatabaseOptions = (): SelectItem[] => {
        return this.state.databaseOptions.map(x => ({
            name: x.database,
            value: x.database
        })).sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
    }

    getCollectionOptions = (): SelectItem[] => {
        if (!this.searchFilter.database) {
            return [];
        }

        return this.state.databaseOptions
            .filter(x => x.database === this.searchFilter.database)
            .flatMap(x => x.collections.map(coll => ({ name: coll, value: coll })))
            .sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
    }

    get currentFilter(): OplogFilterModel {
        return this.state.currentFilter;
    }

    get searchFilter(): OplogFilterModel {
        return this.state.searchFilter;
    }

    private onSearchFilterChange = () => {
        return this.setState({
            searchFilter: {
                ...this.state.searchFilter,
                filterId: ""
            }
        })
    }

    setDatabase = async (value: string) => {
        await this.setState({
            searchFilter: {
                ...this.state.searchFilter,
                database: value,
                collection: "",
                recordId: ""
            }
        });

        await this.onSearchFilterChange();
    }

    setCollection = async (value: string) => {
        await this.setState({
            searchFilter: {
                ...this.state.searchFilter,
                collection: value,
                recordId: ""
            }
        })
        await this.onSearchFilterChange();
    }

    setRecordId = async (value: string) => {
        await this.setState({
            searchFilter: {
                ...this.state.searchFilter,
                recordId: value
            }
        })
        await this.onSearchFilterChange();
    }

    setStartDate = async (value: Date | null) => {
        await this.setState({
            searchFilter: {
                ...this.state.searchFilter,
                startDate: value
            }
        })
        await this.onSearchFilterChange();
    }

    setEndDate = async (value: Date | null) => {
        await this.setState({
            searchFilter: {
                ...this.state.searchFilter,
                endDate: value
            }
        })
        await this.onSearchFilterChange();
    }

    setShowFullTransactionLog = async (value: boolean) => {
        await this.setState({
            searchFilter: {
                ...this.state.searchFilter,
                showFullTransactionLog: value
            }
        })
        await this.onSearchFilterChange();
    }

    generateFilterId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    toggleFavouriteFilter = async () => {
        if (this.isSearchFilterFromFavourites()) {
            await this.deleteFavouriteFilter(this.searchFilter.filterId);
        } else {
            const filterId = this.searchFilter.filterId || this.generateFilterId();

            await this.setState({
                favouriteFilters: [...this.state.favouriteFilters, {
                    ...this.searchFilter,
                    filterId
                }],
                searchFilter: {
                    ...this.searchFilter,
                    filterId
                }
            });
        }
    }

    deleteFavouriteFilter = async (filterId: string) => {
        await this.setState({
            favouriteFilters: [...this.state.favouriteFilters.filter(x => x.filterId !== filterId)]
        })
    }

    setSearchFilterFromFavourites = async (filterId: string) => {
        const filter = this.state.favouriteFilters.find(x => x.filterId === filterId);
        if(filter){
            await this.setState({
                searchFilter: {...filter}
            })
        }
    }
  }