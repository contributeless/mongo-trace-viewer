import React from "react";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";
import { OplogEntryViewer } from "./OplogEntry";

export class OplogList extends React.Component<{}, {}> {
    render() {
        return (
            <Subscribe to={[OplogContainer]}>
                {(oplog: OplogContainer) => (
                    <div>
                        {oplog.state.items.map((x, index) => <OplogEntryViewer entry={x} key={index} />)}
                    </div>
                )}
            </Subscribe>
        );
    };
}
