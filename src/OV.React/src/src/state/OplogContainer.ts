import { OplogEntry } from "../models/OplogEntry";
import { OplogService } from "../services/OplogService";
import { BaseContainer } from "./BaseContainer";
import { OplogFilterContainer } from "./OplogFilterContainer";
import { ServiceContainer } from "./ServiceContainer";

export interface OplogContainerState {
    items: OplogEntry[],
    pageSize: number
}

export enum ListAction {
    replace = "replace",
    addAfter = "addAfter",
    addBefore = "addBefore"
}

export class OplogContainer extends BaseContainer<OplogContainerState> {
    state: OplogContainerState = {
        items: [],
        pageSize: 10
    };
    filterContainer: OplogFilterContainer;

    constructor(filterContainer: OplogFilterContainer, serviceContainer: ServiceContainer){
       super(serviceContainer);
       this.filterContainer = filterContainer; 
    }

    initialize = async (): Promise<void> => {
        // await this.reloadList();
    }

    setPageSize = async (size: number) => {
        await this.setState({
            pageSize: size
        });

        await this.reloadList(null, ListAction.replace);
    }

    getPageSize = () => {
        return this.state.pageSize;
    }

    loadNewItems = async () => {
        console.log("load new items")
    }

    loadNextPage = async () => {
        const ascSortedTs = this.state.items.map(x => x.timestamp).sort(function(d1, d2){
            return d1.localeCompare(d2);
        })

        const maxTs = ascSortedTs.length ? ascSortedTs[0] : null;
        await this.reloadList(maxTs, ListAction.addAfter);
    }

    reloadList = async (maxTimestamp?: string | null, action: ListAction = ListAction.replace) => {

        const currentFilter = this.filterContainer.currentFilter;

        const oplog = await this.makeRequest(() => OplogService.getOplog({
            database: currentFilter.database || null,
            collection: currentFilter.collection || null,
            recordId: currentFilter.recordId || null,
            maxTimestamp: maxTimestamp ?? null,
            paging: {
                ascending: false,
                orderBy: "ts",
                pageSize: this.state.pageSize,
                pageNumber: 1
            }
        }));

        if(action == ListAction.replace) {
            await this.setState({
                items: oplog.items
            })
        } else if(action == ListAction.addAfter){
            await this.setState({
                items: [...this.state.items, ...oplog.items]
            })
        } else if(action == ListAction.addBefore){
            await this.setState({
                items: [...oplog.items, ...this.state.items]
            })
        }

        
    }
}