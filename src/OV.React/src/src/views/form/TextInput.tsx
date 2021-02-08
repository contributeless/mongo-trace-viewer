import React from "react";


export interface TextInputProps {
    name: string;
    onChange: (value: string) => void;
    id?: string;
    value: string;
    label: string;
    type?: string;
    className?: string;
}

export function TextInput(props: TextInputProps) {
    return (<div className={`form-input form-text ${props.className ?? ""}`}>
        {!!props.label && <label htmlFor={props.id ?? props.name}>{props.label}</label>}
        <input  name={props.name} id={props.id ?? props.name} type={props.type ?? "text"} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
    </div>
    );
}