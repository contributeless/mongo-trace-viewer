import { OplogEntry } from "../models/OplogEntry";
import { OplogService } from "../services/OplogService";
import { BaseContainer } from "./BaseContainer";
import { OplogFilterContainer } from "./OplogFilterContainer";
import { ServiceContainer } from "./ServiceContainer";

export interface OplogContainerState {
    items: OplogEntry[]
}

export class OplogContainer extends BaseContainer<OplogContainerState> {
    state: OplogContainerState = {
        items: [],
    };
    filterContainer: OplogFilterContainer;

    constructor(filterContainer: OplogFilterContainer, serviceContainer: ServiceContainer){
       super(serviceContainer);
       this.filterContainer = filterContainer; 
    }

    initialize = async (): Promise<void> => {
        await this.reloadList();
    }

    reloadList = async () => {

        const currentFilter = this.filterContainer.currentFilter;

        const oplog = await this.makeRequest(() => OplogService.getOplog({
            database: currentFilter.database || null,
            collection: currentFilter.collection || null,
            recordId: currentFilter.recordId || null
        }));

        await this.setState({
            items: oplog.items
        })
    }
}