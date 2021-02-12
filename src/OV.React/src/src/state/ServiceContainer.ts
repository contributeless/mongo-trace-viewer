import { Container } from "unstated";

export interface ServiceContainerState {
    loadersCount: number;
}

export class ServiceContainer extends Container<ServiceContainerState>{
    state: ServiceContainerState = {
        loadersCount: 0
    }

    incrementLoadersCount = () => {
        console.log("loaders count", this.state.loadersCount + 1)
        return this.setState({
            loadersCount: this.state.loadersCount + 1
        })
    }

    decrementLoadersCount = () => {
        console.log("loaders count", this.state.loadersCount - 1)
        return this.setState({
            loadersCount: this.state.loadersCount - 1
        })
    }

    isLoadingEnabled = () => {
        return this.state.loadersCount > 0;
    }
}