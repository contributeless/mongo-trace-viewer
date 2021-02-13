import React from "react";
import  "./sidePanel.styl";
import RefreshIcon from "./icons/refresh.svg";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";
import { RadioGroup } from "./form/RadioGroup";


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
            <div className={`side-panel__changes-detector changes-detector ${oplog.state.isNewItemsPresent ? "changes-detector__new-items-present": ""} ${oplog.state.isNewItemsPresentCheckRunning ? "changes-detector__check-running": ""}`} onClick={oplog.loadNewItems}>
                <RefreshIcon className="changes-detector__icon"></RefreshIcon>
                {/* <div className="changes-detector__tooltip">There are new records present on server</div> */}
            </div>
            <div className="side-panel-separator"></div>
            <div className="side-panel__page-sizer page-sizer__container">
                <RadioGroup options={pageSizerOptions.map(x => ({ name: x.size.toString(), value: x.size.toString() }))}
                    className="page-sizer"
                    name="page-sizer-input"
                    value={oplog.getPageSize().toString()}
                    onChange={x => oplog.setPageSize(parseInt(x))} />
            </div>
        </div>)}
    </Subscribe>
}