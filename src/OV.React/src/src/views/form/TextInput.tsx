import React from "react";

import "./textInput.styl"

export interface TextInputProps {
    onChange: (value: string) => void;
    name: string;
    id?: string;
    value: string;
    type?: string;
    label: string;
    className?: string;
}

export function TextInput(props: TextInputProps) {
    return (<div className={`form-input form-text ${props.className ?? ""}`}>
        {!!props.label && <label htmlFor={props.id ?? props.name}>{props.label}</label>}
        <input className="text-input"  name={props.name} id={props.id ?? props.name} type={props.type ?? "text"} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
    );
}