import * as React from 'react';
import { OplogListContainer } from './views/OplogListContainer';
import { ConfigService } from './services/ConfigService';
import { Provider, Subscribe } from 'unstated';
import { OplogFilterContainer } from './state/OplogFilterContainer';
import { OplogContainer } from './state/OplogContainer';
import { Loader } from './views/Loader';
import { ServiceContainer } from './state/ServiceContainer';

type Props = {

};
type State = {
   isDbConnectionConfigured: boolean,

};

export class App extends React.Component<Props, State> {
    filterContainer: OplogFilterContainer;
    oplogContainer: OplogContainer;
    serviceContainer: ServiceContainer;
    constructor(props: Props){
        super(props);

        this.serviceContainer = new ServiceContainer();
        this.filterContainer = new OplogFilterContainer(this.serviceContainer);
        this.oplogContainer = new OplogContainer(this.filterContainer, this.serviceContainer);
        this.state = {
            isDbConnectionConfigured: true,
        }
    }

    async componentDidMount(){

        await this.filterContainer.initialize();
        await this.oplogContainer.initialize();

        const response = await ConfigService.getConfigStatus();
        this.setState({
            isDbConnectionConfigured: response.isConfigured,
        })
    }

    render() {
        return (
            <Provider inject={[this.filterContainer, this.oplogContainer, this.serviceContainer]}>
                <>
                    {/* <div>Is connection string present: {this.state.isDbConnectionConfigured.toString()}</div> */}
                    <OplogListContainer />

                    <Subscribe to={[ServiceContainer]}>
                        {(service: ServiceContainer) => (
                            service.isLoadingEnabled() && <Loader />
                        )}
                    </Subscribe>
                </>
            </Provider>
        );
    };
}
