import React from "react";
import "./oplogSettingsPanel.styl";
import SettingsIcon from "./icons/settings.svg"
import { Tooltip } from "./Tooltip";
import { Modal } from "./Modal";
import { SettingsForm } from "./SettingsForm";
import { SettingsContainer } from "../state/SettingsContainer";
import { Subscribe } from "unstated";

export function OplogSettingsPanel() {
    return <Subscribe to={[SettingsContainer]}>
        {(settings: SettingsContainer) => (settings.state.isConnectionStringEditLocked ? null :
            <Tooltip text="Settings" disabled={settings.state.isSettingsOpened}>
                <div className="oplog-settings" onClick={() => settings.openSettings()}>
                    <SettingsIcon className="oplog-settings__icon" />
                    <Modal isOpened={settings.state.isSettingsOpened} onClose={() => settings.closeSettings()} hideCloseButton={!settings.isSettingsValid()}>
                        <div className="settings__popup-container">
                            <h1>Settings</h1>
                            <SettingsForm onSave={settings.saveSettings} value={settings.state.settings}></SettingsForm>
                        </div>
                    </Modal>
                </div>
            </Tooltip>)}
    </Subscribe>
}