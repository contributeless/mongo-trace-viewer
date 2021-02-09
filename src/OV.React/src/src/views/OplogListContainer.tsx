import * as React from 'react';
import './oplog.styl'
import { OplogFilters } from './OplogFilters';
import { OplogList } from './OplogList';

export class OplogListContainer extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <div className="oplog__container oplog__filters">
                    <OplogFilters />
                </div>
                <div className="oplog__container oplog__list">
                    <OplogList />
                </div>
            </div>
        );
    };
}

