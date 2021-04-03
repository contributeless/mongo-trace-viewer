import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import React from "react";
import  "./dateTimePicker.styl";

export interface DateTimePickerProps {
    value: Date | null;
    name: string;
    id?: string;
    onChange: (value: Date | null) => void;
    label: string;
    className?: string;
}

export function DateTimePicker(props: DateTimePickerProps) {
    return (<div className="date-time-picker__container form-input form-text">
        {!!props.label && <label htmlFor={props.id ?? props.name}>{props.label}</label>}
        <Datetime value={props.value ?? ""}
            utc={false}
            closeOnClickOutside={true}
            closeOnSelect={true}
            onChange={(momentValue) => typeof momentValue == "string" || !momentValue.isValid() ? null : props.onChange(momentValue.toDate())}
            className={`${props.className ?? ""}`}
            initialValue={""}
            input
            inputProps={{
                className: "text-input",
                name: props.name,
                id: props.id ?? props.name,
                autoComplete: "off"
            }}
            renderInput={(innerProps) => {
                return <input {...innerProps} value={props.value ? innerProps.value : ''} />
            }}
        ></Datetime>
        <button className="close-btn" type="button" onClick={() => props.onChange(null)}>&#10006;</button>
    </div>
    );
}