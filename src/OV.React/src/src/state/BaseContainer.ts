import { Container } from "unstated";
import { ServiceContainer } from "./ServiceContainer";

export class BaseContainer<State extends object> extends Container<State> {

    serviceContainer: ServiceContainer;
    constructor(serviceContainer: ServiceContainer){
        super();
        this.serviceContainer = serviceContainer;
    }

    makeRequest = async <TResponse>(func: () => Promise<TResponse>, skipLoadersChange: boolean = false): Promise<TResponse> => {
        try{
            if(!skipLoadersChange){
                await this.serviceContainer.incrementLoadersCount();
            }
            return await func();
        }
        finally {
            if(!skipLoadersChange){
                await this.serviceContainer.decrementLoadersCount();
            }
        }
    }
}