import { OplogFilterModel } from "../models/OplogFilterModel";
import { DatabasePrefillModel } from "../models/PrefillResponse";
import { OplogService } from "../services/OplogService";
import { SelectItem } from "../views/form/Select";
import { BaseContainer } from "./BaseContainer";
import { ServiceContainer } from "./ServiceContainer";

export interface OplogFilterContainerState {
    currentFilter: OplogFilterModel;
    favouriteFilters: OplogFilterModel[];
    databaseOptions: DatabasePrefillModel[];
}

export class OplogFilterContainer extends BaseContainer<OplogFilterContainerState> {
    state: OplogFilterContainerState = {
        currentFilter: {
            collection: "",
            database: "",
            recordId: "",
            filterId: ""
        },
        favouriteFilters: [],
        databaseOptions: []
    };

    constructor(serviceContainer: ServiceContainer){
        super(serviceContainer);
    }

    initialize = async (): Promise<void> => {
        const prefillResponse = await this.makeRequest(() => OplogService.prefill());
        
        await this.setState({
            databaseOptions: prefillResponse.databases
        });
    };

    getDatabaseOptions = (): SelectItem[] => {
        return this.state.databaseOptions.map(x => ({
            name: x.database,
            value: x.database
        })).sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
    }

    getCollectionOptions = (): SelectItem[] => {
        if (!this.currentFilter.database) {
            return [];
        }

        return this.state.databaseOptions
            .filter(x => x.database === this.currentFilter.database)
            .flatMap(x => x.collections.map(coll => ({ name: coll, value: coll })))
            .sort((a, b) => a.name < b.name ? -1 : (a.name > b.name ? 1 : 0));
    }

    get currentFilter(): OplogFilterModel {
        return this.state.currentFilter;
    }

    setDatabase = (value: string) => {
        return this.setState({
            currentFilter: {
                ...this.state.currentFilter,
                database: value
            }
        })
    }

    setCollection = (value: string) => {
        return this.setState({
            currentFilter: {
                ...this.state.currentFilter,
                collection: value
            }
        })
    }

    setRecordId = (value: string) => {
        return this.setState({
            currentFilter: {
                ...this.state.currentFilter,
                recordId: value
            }
        })
    }

    generateFilterId = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    saveCurrentFilterToFavourites = () => {
        const filterId = this.currentFilter.filterId ?? this.generateFilterId();

        return this.setState({
            favouriteFilters: [...this.state.favouriteFilters, {
                ...this.currentFilter,
                filterId
            }]
        })
    }
  }