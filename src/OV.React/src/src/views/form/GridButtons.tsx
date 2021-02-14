import React from "react";
import DeleteIcon from "../icons/delete.svg";
import SelectIcon from "../icons/selection.svg";
import "./gridButtons.styl"


export interface GridButtonProps {
    onClick: () => void;
    className?: string;
}

export function DeleteGridButton(props: GridButtonProps){
    return <div className={`grid-btn__container delete-btn ${props.className ?? ""}`} onClick={props.onClick}>
        <DeleteIcon className="delete-icon"></DeleteIcon>
    </div>
}

export function SelectGridButton(props: GridButtonProps){
    return <div className={`grid-btn__container select-btn ${props.className ?? ""}`}  onClick={props.onClick}>
        <SelectIcon className="select-icon"></SelectIcon>
    </div>
} 