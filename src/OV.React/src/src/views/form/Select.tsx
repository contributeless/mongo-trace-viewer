import React from "react";
import "./select.styl";

export interface SelectItem {
    value: string;
    name: string;
}

export interface SelectProps {
    label: string;
    name: string;
    onChange: (value: string) => void;
    options: SelectItem[];
    id?: string;
    pleaseSelectLabel?: string;
    value: string;
    className?: string;
}

export function Select(props: SelectProps) {
    return (<div className={`form-input form-select ${props.className ?? ""}`}>
        {!!props.label && <label htmlFor={props.id ?? props.name}>{props.label}</label>}
        <select className="select-css" name={props.name} id={props.id ?? props.name} value={props.value} onChange={(e) => props.onChange(e.target.value)}>
            {!!props.pleaseSelectLabel && <option value="">{props.pleaseSelectLabel}</option>}
            <>{props.options.map(x => <option value={x.value} key={x.value}>{x.name}</option>)}</>
        </select>
    </div>
    );
}