import { Container } from "unstated";
import { OplogEntry } from "../models/OplogEntry";
import { OplogService } from "../services/OplogService";
import { OplogFilterContainer } from "./OplogFilterContainer";

export interface OplogContainerState {
    items: OplogEntry[]
}

export class OplogContainer extends Container<OplogContainerState> {
    state: OplogContainerState = {
        items: [],
    };
    filterContainer: OplogFilterContainer;

    constructor(filterContainer: OplogFilterContainer){
       super();
       this.filterContainer = filterContainer; 
    }

    initialize = async (): Promise<void> => {

        await this.reloadList();
    }

    reloadList = async () => {

        const currentFilter = this.filterContainer.currentFilter;

        const oplog = await OplogService.getOplog({
            database: currentFilter.database || null,
            collection: currentFilter.collection || null,
            recordId: currentFilter.recordId || null
        });

        await this.setState({
            items: oplog.items
        })
    }
}