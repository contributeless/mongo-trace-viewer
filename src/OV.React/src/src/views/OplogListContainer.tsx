import * as React from 'react';
import './oplog.styl'
import { OplogFilters } from './OplogFilters';
import { OplogList } from './OplogList';
import { SidePanel } from './SidePanel';

export class OplogListContainer extends React.Component<{}, {}> {
    render() {
        return (
            <div className="oplog__main">
                <div className="oplog__filters-wrapper">
                    <div className="oplog__container oplog__filters">
                        <OplogFilters />
                    </div>
                </div>

                <div className="oplog__list-wrapper">
                    <div className="oplog__container oplog__list">
                        <OplogList />
                    </div>
                    <SidePanel pageSize={10} />
                </div>
            </div>
        );
    };
}

