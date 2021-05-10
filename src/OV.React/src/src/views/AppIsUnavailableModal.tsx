import React from "react";
import { Subscribe } from "unstated";
import { SettingsContainer } from "../state/SettingsContainer";
import { Modal } from "./Modal";
import "./appIsUnavailableModal.styl";

export function AppIsUnavailableModal() {
    return <Subscribe to={[SettingsContainer]}>
        {(settings: SettingsContainer) => (<Modal hideCloseButton={true} isOpened={!settings.isAppCouldBeUsed()} onClose={() => ({})} className="app-is-unavailable-modal">
            <h2>The app is currently unavailable. Please try later </h2>
        </Modal>)}
    </Subscribe>
}