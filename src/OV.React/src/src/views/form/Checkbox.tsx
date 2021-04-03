import React from "react";
import "./checkbox.styl";

export interface CheckboxProps {
    onChange: (value: boolean) => void;
    name: string;
    id?: string;
    value: boolean;
    label: string;
    className?: string;
}

export function Checkbox(props: CheckboxProps) {
    return (<div className={`form-input form-checkbox ${props.className ?? ""}`}>
        {!!props.label && <label htmlFor={props.id ?? props.name}>{props.label}</label>}
        <input className="checkbox-input" name={props.name} id={props.id ?? props.name} type={"checkbox"} checked={props.value} onChange={(e) => props.onChange(e.target.checked)} />
    </div>
    );
}