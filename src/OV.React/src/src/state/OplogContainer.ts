import { OplogEntry } from "../models/OplogEntry";
import { OplogListResponse } from "../models/OplogListResponse";
import { FilterService } from "../services/FilterService";
import { OplogService } from "../services/OplogService";
import { BaseContainer } from "./BaseContainer";
import { OplogFilterContainer } from "./OplogFilterContainer";
import { ServiceContainer } from "./ServiceContainer";

export interface OplogContainerState {
    items: OplogEntry[],
    pageSize: number,
    isNewItemsPresentCheckRunning: boolean;
    isNewItemsPresent: boolean;
    isNextPageLoadingRunning: boolean,
    isLoadMoreAvailable: boolean
}

export enum ListAction {
    replace = "replace",
    addAfter = "addAfter",
    addBefore = "addBefore"
}

export class OplogContainer extends BaseContainer<OplogContainerState> {
    state: OplogContainerState = {
        items: [],
        pageSize: 10,
        isNewItemsPresentCheckRunning: false,
        isNewItemsPresent: false,
        isNextPageLoadingRunning: false,
        isLoadMoreAvailable: false
    };

    newItemsInterval: NodeJS.Timeout | null = null;
    filterContainer: OplogFilterContainer;

    constructor(filterContainer: OplogFilterContainer, serviceContainer: ServiceContainer){
       super(serviceContainer);
       this.filterContainer = filterContainer; 
    }

    initialize = async (): Promise<void> => {
        const pagingOptions = FilterService.loadPagingOptions();

        await this.setState({
            pageSize: pagingOptions?.pageSize ?? this.state.pageSize
        })

        this.subscribe(this.onStateChange)
    };

    onStateChange = ()=> {
        FilterService.savePagingOptions({
            pageSize: this.state.pageSize
        });
    }

    setPageSize = async (size: number) => {
        await this.setState({
            pageSize: size
        });

        await this.reloadList(null, ListAction.replace, null, false, false, true);
    }

    getPageSize = () => {
        return this.state.pageSize;
    }

    loadNewItems = async () => {
        const descSortedTs = this.state.items.map(x => x.timestamp).sort(function(d1, d2){
            return d2.localeCompare(d1);
        })

        const maxTs = descSortedTs.length ? descSortedTs[0] : null;
        await this.reloadList(null, ListAction.addBefore, maxTs);
    }

    loadNextPage = async () => {
        const ascSortedTs = this.state.items.map(x => x.timestamp).sort(function(d1, d2){
            return d1.localeCompare(d2);
        })

        const minTs = ascSortedTs.length ? ascSortedTs[0] : null;
        try{
            await this.setState({
                isNextPageLoadingRunning: true
            })
            await this.reloadList(minTs, ListAction.addAfter, null, false, true, true);
        }
        finally{
            await this.setState({
                isNextPageLoadingRunning: false
            })
        }
    }

    private fetchOplog = (maxTimestamp: string | null, minTimestamp: string | null, pageSize : number, skipLoadersChange: boolean = false): Promise<OplogListResponse> => {
        const currentFilter = this.filterContainer.currentFilter;

        return this.makeRequest(() => OplogService.getOplog({
            database: currentFilter.database || null,
            collection: currentFilter.collection || null,
            recordId: currentFilter.recordId || null,
            startDate: currentFilter.startDate || null,
            endDate: currentFilter.endDate || null,
            maxTimestamp: maxTimestamp ?? null,
            minTimestamp: minTimestamp ?? null,
            paging: {
                ascending: false,
                orderBy: "ts",
                pageSize: pageSize,
                pageNumber: 1
            }
        }), skipLoadersChange);
    }

    mergeOplog = async (response: OplogListResponse, action: ListAction = ListAction.replace): Promise<void> => {
        if(action == ListAction.replace) {
            await this.setState({
                items: response.items
            })
        } else if(action == ListAction.addAfter){
            await this.setState({
                items: [...this.state.items, ...response.items]
            })
        } else if(action == ListAction.addBefore){
            await this.setState({
                items: [...response.items, ...this.state.items]
            })
        }
    }

    setNewChangesInterval = () => {
        this.clearNewChangesInterval();
        this.newItemsInterval = setInterval(this.setIsNewItemsAvailable, 10000);
    }

    clearNewChangesInterval = () => {
        if(!!this.newItemsInterval){
            clearInterval(this.newItemsInterval);
            this.newItemsInterval = null;
        }
    }

    setIsNewItemsAvailable = async () => {
        this.clearNewChangesInterval();

        const descSortedTs = this.state.items.map(x => x.timestamp).sort(function(d1, d2){
            return d2.localeCompare(d1);
        })

        const maxTs = descSortedTs.length ? descSortedTs[0] : null;

        if(!!maxTs){
            try{
                await this.setState({
                    isNewItemsPresentCheckRunning: true
                });
                const oplogResponse = await this.fetchOplog(null, maxTs, 1, true);

                await this.setState({
                    isNewItemsPresent: !!oplogResponse && !!oplogResponse.items && !!oplogResponse.items.length
                });
            }
            finally{
                await this.setState({
                    isNewItemsPresentCheckRunning: false
                });
            }
        }

        this.setNewChangesInterval();
    }

    startNewSearch = () => {
        return this.reloadList(null, ListAction.replace, null, true, false, true);
    }

    reloadList = async (maxTimestamp?: string | null, 
        action: ListAction = ListAction.replace, 
        minTimestamp?: string | null, 
        applySearchFilter: boolean = false, 
        skipLoadersChange: boolean = false,
        checkLoadMoreAvailable: boolean = false) => {
        
        if(applySearchFilter){
            await this.filterContainer.applySearchFilter();
        }
        
        const pageSize = checkLoadMoreAvailable ? this.state.pageSize + 1 : this.state.pageSize;

        const oplog = await this.fetchOplog(maxTimestamp ?? null, minTimestamp ?? null, pageSize, skipLoadersChange);

        if(checkLoadMoreAvailable){
            await this.setState({
                isLoadMoreAvailable: oplog.items?.length > this.state.pageSize
            })
        }

        await this.mergeOplog(oplog, action);
        
        this.setNewChangesInterval();
    }
}