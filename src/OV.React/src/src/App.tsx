import * as React from 'react';
import { OplogListContainer } from './views/OplogListContainer';
import { ConfigService } from './services/ConfigService';
import { Provider, Subscribe } from 'unstated';
import { OplogFilterContainer } from './state/OplogFilterContainer';
import { OplogContainer } from './state/OplogContainer';
import { Loader } from './views/Loader';
import { ServiceContainer } from './state/ServiceContainer';
import { SettingsContainer } from './state/SettingsContainer';

type Props = {

};
type State = {
   isDbConnectionConfigured: boolean,

};

export class App extends React.Component<Props, State> {
    filterContainer: OplogFilterContainer;
    oplogContainer: OplogContainer;
    serviceContainer: ServiceContainer;
    settingsContainer: SettingsContainer;
    constructor(props: Props){
        super(props);

        this.serviceContainer = new ServiceContainer();
        this.settingsContainer = new SettingsContainer(this.serviceContainer);
        this.filterContainer = new OplogFilterContainer(this.serviceContainer);
        this.oplogContainer = new OplogContainer(this.filterContainer, this.serviceContainer);
        this.state = {
            isDbConnectionConfigured: true,
        }
    }

    async componentDidMount() {
        this.settingsContainer.subscribe(async () => {
            if (this.settingsContainer.isSettingsValid() && !this.settingsContainer.state.isSettingsOpened) {
                await this.filterContainer.initialize();
                await this.oplogContainer.initialize();
            }
        })

        await this.settingsContainer.initialize();
    }

    render() {
        return (
            <Provider inject={[this.filterContainer, this.oplogContainer, this.serviceContainer, this.settingsContainer]}>
                <>
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
