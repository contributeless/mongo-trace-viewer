import { Container } from "unstated";

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
}