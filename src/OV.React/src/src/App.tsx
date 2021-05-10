import * as React from 'react';
import { OplogListContainer } from './views/OplogListContainer';
import { Provider, Subscribe } from 'unstated';
import { OplogFilterContainer } from './state/OplogFilterContainer';
import { OplogContainer } from './state/OplogContainer';
import { Loader } from './views/Loader';
import { ServiceContainer } from './state/ServiceContainer';
import { SettingsContainer } from './state/SettingsContainer';
import { ErrorNotificationList } from './views/ErrorNotificationList';
import EventHub from './services/EventHub';
import { EventTypes } from './models/EventTypes';
import { AppIsUnavailableModal } from './views/AppIsUnavailableModal';

interface AppProps {

};
interface AppState  {
};

export class App extends React.Component<AppProps, AppState> {
    filterContainer: OplogFilterContainer;
    oplogContainer: OplogContainer;
    serviceContainer: ServiceContainer;
    settingsContainer: SettingsContainer;
    constructor(props: AppProps){
        super(props);

        this.serviceContainer = new ServiceContainer();
        this.settingsContainer = new SettingsContainer(this.serviceContainer);
        this.filterContainer = new OplogFilterContainer(this.serviceContainer);
        this.oplogContainer = new OplogContainer(this.filterContainer, this.serviceContainer);
    }

    async componentDidMount() {
        await this.settingsContainer.initialize();
        await this.filterContainer.initialize(this.settingsContainer.isSettingsValid());
        await this.oplogContainer.initialize();

        EventHub.on(EventTypes.CONNECTION_STRING_CHANGED, async () => {
            await this.filterContainer.reloadPrefillInfo();
        });
    }

    render() {
        return (
            <Provider inject={[this.filterContainer, this.oplogContainer, this.serviceContainer, this.settingsContainer]}>
                <>
                    <OplogListContainer />
                    <Subscribe to={[ServiceContainer]}>
                        {(service: ServiceContainer) => (
                            <Loader isEnabled={service.isLoadingEnabled()} />
                        )}
                    </Subscribe>
                    <AppIsUnavailableModal />
                    <ErrorNotificationList />
                </>
            </Provider>
        );
    };
}
