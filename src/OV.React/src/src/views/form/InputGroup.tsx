import React from "react";

export interface InputGroupProps {
    className?: string;
}

export function InputGroup(props: React.PropsWithChildren<InputGroupProps>) {
    return <div className={`input-group ${props.className ?? ""}`}>{props.children}</div>;
}

