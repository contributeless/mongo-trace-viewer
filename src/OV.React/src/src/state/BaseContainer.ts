import { Container } from "unstated";
import { ServiceContainer } from "./ServiceContainer";

export class BaseContainer<State extends object> extends Container<State> {

    serviceContainer: ServiceContainer;
    constructor(serviceContainer: ServiceContainer){
        super();
        this.serviceContainer = serviceContainer;
    }

    makeRequest = async <TResponse>(func: () => Promise<TResponse>): Promise<TResponse> => {
        try{
            await this.serviceContainer.incrementLoadersCount();
            return await func();
        }
        finally {
            await this.serviceContainer.decrementLoadersCount();
        }
    }
}