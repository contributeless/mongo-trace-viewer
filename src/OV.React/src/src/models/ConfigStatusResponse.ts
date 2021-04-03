import { SettingsModel } from "./SettingsModel";

export interface ConfigStatusResponse extends SettingsModel {
    isConfigured: boolean;
}