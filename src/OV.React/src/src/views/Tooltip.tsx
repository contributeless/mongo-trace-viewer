import React from "react";
import Popup from 'reactjs-popup';
import "./tooltip.styl"

export interface TooltipProps {
    text: string;
    children: JSX.Element;
    disabled: boolean;
}

export function Tooltip(props: TooltipProps) {
    return <Popup
        trigger={props.children}
        position={['top left', 'top right']}
        on={['hover', 'focus']}
        arrow={true}
        disabled={props.disabled}
        >
        <div className="oplog-tooltip">{props.text}</div>
    </Popup>

}