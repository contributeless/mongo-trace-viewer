import React from "react";

export interface ActionButtonProps {
    label: string;
    type: 'button' | 'submit';
    onClick?: () => void
}

export function ActionButton(props: ActionButtonProps){
    return <button type={props.type} className="action-button" onClick={props.onClick ? props.onClick : undefined}>{props.label}</button>
}