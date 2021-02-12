import React from "react";
import "./buttonsGroup.styl";

export interface ButtonsGroupProps {
    className?: string;
}

export function ButtonsGroup(props: React.PropsWithChildren<ButtonsGroupProps>) {
    return <div className={`button-group ${props.className ?? ""}`}>{props.children}</div>;
}

