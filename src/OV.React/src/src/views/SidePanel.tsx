import React from "react";
import  "./sidePanel.styl";
import RefreshIcon from "./icons/refresh.svg";


export interface SidePanelProps {
    pageSize: number;
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

export function SidePanel(props: SidePanelProps) {
    return <div className="side-panel__container">
        <div className="side-panel__changes-detector hanges-detector">
            <RefreshIcon className="changes-detector__icon"></RefreshIcon>
        </div>
        <div className="side-panel__page-sizer page-sizer">
            {pageSizerOptions.map(x => <div className="page-sizer-option">{x.size}</div>)}
        </div>
    </div>
}