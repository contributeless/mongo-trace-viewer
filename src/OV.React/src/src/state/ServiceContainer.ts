import { Container } from "unstated";
import { EventTypes } from "../models/EventTypes";
import { ServerErrorModel } from "../models/ServerErrorModel";
import EventHub from "../services/EventHub";

export interface ServiceContainerState {
    loadersCount: number;
}

export class ServiceContainer extends Container<ServiceContainerState>{
    state: ServiceContainerState = {
        loadersCount: 0
    }

    incrementLoadersCount = () => {
        return this.setState({
            loadersCount: this.state.loadersCount + 1
        })
    }

    decrementLoadersCount = () => {
        return this.setState({
            loadersCount: this.state.loadersCount - 1
        })
    }

    isLoadingEnabled = () => {
        return this.state.loadersCount > 0;
    }

    onFetchError = (error: ServerErrorModel) => {
        EventHub.emit(EventTypes.FETCH_ERROR, error ?? {
            errors: []
        } as ServerErrorModel)
    }
}