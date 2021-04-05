import React, { useState } from "react";
import { SettingsModel } from "../models/SettingsModel";
import { ActionButton } from "./form/ActionButton";
import { ButtonsGroup } from "./form/ButtonsGroup";
import { InputGroup } from "./form/InputGroup";
import { TextInput } from "./form/TextInput";
import "./settingsForm.styl";

export interface SettingsFormProps {
    value: SettingsModel;
    onSave: (model: SettingsModel) => void; 
}

export function SettingsForm(props: SettingsFormProps){

    const [connectionString, setConnectionString] = useState(props.value.connectionString);

    const saveSettings = () => {
        props.onSave({
            connectionString: connectionString
        })
    }

    return <form onSubmit={(e: React.FormEvent) => { e.preventDefault(); saveSettings() }} autoComplete="off">
        <InputGroup className="oplog-settings-group">
            <TextInput name="connectionString" onChange={setConnectionString} value={connectionString} label="Mongo connection string:" />
            <div className="oplog-settings__connection-string-example">For example: mongodb://localhost:27017</div>
        </InputGroup>
        <ButtonsGroup className="oplog-settings-buttons-group">
            <ActionButton label="Save" type='submit' />
        </ButtonsGroup>
    </form>
}