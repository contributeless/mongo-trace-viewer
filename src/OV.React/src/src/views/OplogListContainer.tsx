import * as React from 'react';
import { Subscribe } from 'unstated';
import { OplogContainer } from '../state/OplogContainer';
import './oplog.styl'
import { OplogFilters } from './OplogFilters';
import { OplogList } from './OplogList';
import { OplogSettingsPanel } from './OplogSettingsPanel';
import { SidePanel } from './SidePanel';

export interface OplogListContainerProps {

}

export class OplogListContainer extends React.Component<OplogListContainerProps, {}> {
    render() {
        return (
            <div className="oplog__main">
                <div className="oplog__filters-wrapper">
                    <div className="oplog__settings-container">
                        <OplogSettingsPanel />
                    </div>
                    <div className="oplog__container oplog__filters">
                        <OplogFilters />
                    </div>

                </div>
                <Subscribe to={[OplogContainer]}>
                    {(oplog: OplogContainer) => (
                        oplog.state.isSearchStarted && <div className="oplog__list-wrapper">
                            <SidePanel />
                            <div className="oplog__container oplog__list">
                                <OplogList />
                            </div>
                        </div>
                    )}
                </Subscribe>

            </div>
        );
    };
}

