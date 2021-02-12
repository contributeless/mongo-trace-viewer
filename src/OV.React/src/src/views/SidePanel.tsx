import React from "react";
import  "./sidePanel.styl";
import RefreshIcon from "./icons/refresh.svg";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";


export interface SidePanelProps {

}

interface PageSizerOption {
    size: number;
}

const pageSizerOptions: PageSizerOption[] = [
    {
        size: 10
    },
    {
        size: 20
    },
    {
        size: 50
    },
]

export function SidePanel() {
    return <Subscribe to={[OplogContainer]}>
        {(oplog: OplogContainer) => (<div className="side-panel__container">
            <div className="side-panel__changes-detector hanges-detector">
                <RefreshIcon className="changes-detector__icon"></RefreshIcon>
            </div>
            <div className="side-panel__page-sizer page-sizer">
                {pageSizerOptions.map(x => <div className="page-sizer-option">{x.size}</div>)}
            </div>
        </div>)}
    </Subscribe>
}