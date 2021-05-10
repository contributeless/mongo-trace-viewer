import { EventTypes } from "../models/EventTypes";
import { SettingsModel } from "../models/SettingsModel";
import { ConfigService } from "../services/ConfigService";
import EventHub from "../services/EventHub";
import { BaseContainer } from "./BaseContainer";
import { ServiceContainer } from "./ServiceContainer";

export interface SettingsContainerState {
    settings: SettingsModel,
    isConfigured: boolean,
    isSettingsOpened : boolean,
    isConnectionStringEditLocked: boolean
}

export class SettingsContainer extends BaseContainer<SettingsContainerState> {
    state: SettingsContainerState = {
        settings: {
            connectionString: ""
        },
        isConfigured: false,
        isSettingsOpened: false,
        isConnectionStringEditLocked: false
    };

    constructor(serviceContainer: ServiceContainer){
        super(serviceContainer);
    }

    initialize = async (): Promise<void> => {
        const configStatus = await this.makeRequest(() => ConfigService.getConfigStatus());
        
        await this.setState({
            isConfigured: configStatus.isConfigured,
            settings: {
                connectionString: configStatus.connectionString ?? ""
            },
            isSettingsOpened: configStatus.isConfigured === false && !configStatus.isConnectionStringEditLocked,
            isConnectionStringEditLocked: configStatus.isConnectionStringEditLocked
        });
    }

    isAppCouldBeUsed = () => {
        return !(!this.isSettingsValid() && this.state.isConnectionStringEditLocked);
    }

    isSettingsValid = () => {
        return this.state.isConfigured === true;
    }

    closeSettings = () => {
        return this.setState({
            isSettingsOpened: false
        })
    }

    openSettings = () => {
        return this.setState({
            isSettingsOpened: true
        })
    }

    saveSettings = async (model: SettingsModel) => {
        const result = await this.makeRequest(() => ConfigService.saveConfig({
            connectionString: model.connectionString
        }));

        const isConnectionStringChanged = result.connectionString != this.state.settings.connectionString
            && result.isConfigured === true;

        await this.setState({
            isConfigured: result.isConfigured,
            settings: {
                connectionString: result.connectionString ?? ""
            },
            isSettingsOpened: result.isConfigured === false
        });

        if(isConnectionStringChanged) {
            EventHub.emit(EventTypes.CONNECTION_STRING_CHANGED, {});
        }
        
    }
}