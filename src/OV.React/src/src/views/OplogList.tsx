import React from "react";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";
import { OplogFilterContainer } from "../state/OplogFilterContainer";
import { OplogEntryViewer } from "./OplogEntryViewer";

export class OplogList extends React.Component<{}, {}> {
    render() {
        return (
            <Subscribe to={[OplogContainer, OplogFilterContainer]}>
                {(oplog: OplogContainer, filter: OplogFilterContainer) => (
                    <div>
                        {oplog.state.items.map((x, index) => <OplogEntryViewer entry={x} key={index} selectedRecordId={filter.currentFilter.recordId} selectedCollection={filter.currentFilter.collection} />)}
                    </div>
                )}
            </Subscribe>
        );
    };
}
