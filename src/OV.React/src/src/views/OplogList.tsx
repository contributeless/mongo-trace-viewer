import React from "react";
import { Subscribe } from "unstated";
import { OplogContainer } from "../state/OplogContainer";
import { OplogFilterContainer } from "../state/OplogFilterContainer";
import { ActionButton } from "./form/ActionButton";
import { InlineLoader } from "./InlineLoader";
import { OplogEntryViewer } from "./OplogEntryViewer";

export class OplogList extends React.Component<{}, {}> {
    render() {
        return (
            <Subscribe to={[OplogContainer, OplogFilterContainer]}>
                {(oplog: OplogContainer, filter: OplogFilterContainer) => (
                    <>
                        <div className="oplog-list">
                            {!!oplog.state.items.length && oplog.state.items.map((x, index) => <OplogEntryViewer
                                entry={x} key={index}
                                selectedRecordId={filter.currentFilter.recordId}
                                selectedCollection={filter.currentFilter.collection}
                            />)}
                            {!oplog.state.items.length && <span className="oplog-list__empty">No records found</span>}
                        </div>

                        {!!oplog.state.items.length && !oplog.state.isNextPageLoadingRunning && oplog.state.isLoadMoreAvailable && <div className="load-more-btn__wrapper">
                            <ActionButton onClick={oplog.loadNextPage} label="Load more" type="button" />
                        </div>}
                        {oplog.state.isNextPageLoadingRunning && <div className="items-inline-loader__wrapper">
                            <InlineLoader></InlineLoader>
                        </div>}
                        
                    </>
                )}
            </Subscribe>
        );
    };
}
