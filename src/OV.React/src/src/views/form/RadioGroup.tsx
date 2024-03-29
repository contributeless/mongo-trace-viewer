import React from "react";

export interface RadioOption {
    name: string;
    value: string;
}

export interface RadioGroupProps {
    options: RadioOption[];
    className: string;
    name: string;
    value: string;
    onChange: (value: string) => void
}

export function RadioGroup(props: RadioGroupProps) {
    return <div className={`form-input form-radio-group ${props.className ?? ""}`} >
        {props.options.map(x =>
            <div className="form-radio-option__container" key={x.value}>
                <input type="radio" onChange={e => props.onChange((e.target as any).value)} value={x.value} name={props.name} checked={props.value === x.value} id={`${props.name}_${x.value}`} />
                <label htmlFor={`${props.name}_${x.value}`}>{x.name}</label>
            </div>
        )}
    </div>
} 