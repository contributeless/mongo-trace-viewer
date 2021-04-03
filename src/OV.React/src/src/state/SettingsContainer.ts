import { SettingsModel } from "../models/SettingsModel";
import { ConfigService } from "../services/ConfigService";
import { BaseContainer } from "./BaseContainer";
import { ServiceContainer } from "./ServiceContainer";

export interface SettingsContainerState {
    settings: SettingsModel,
    isConfigured: boolean,
    isSettingsOpened : boolean
}

export class SettingsContainer extends BaseContainer<SettingsContainerState> {
    state: SettingsContainerState = {
        settings: {
            connectionString: ""
        },
        isConfigured: false,
        isSettingsOpened: false
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
            isSettingsOpened: configStatus.isConfigured === false
        });
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

        await this.setState({
            isConfigured: result.isConfigured,
            settings: {
                connectionString: result.connectionString ?? ""
            },
            isSettingsOpened: result.isConfigured === false
        });
    }
}