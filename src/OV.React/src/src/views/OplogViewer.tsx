import * as React from 'react';
import { OplogEntry } from '../models/OplogEntry';
import { OplogOperationType } from '../models/OplogOperationType';
import './oplog.styl'
import { OplogEntryViewer } from './OplogEntry';
import { OplogFilters } from './OplogFilters';


type Props = {
    entries: OplogEntry[]
};
type State = {

};
export class OplogViewer extends React.Component<Props, State> {
    render() {
        const entries = this.props.entries.map((x, index) => <OplogEntryViewer entry={x} key={index} />);
        return (
            <div>
                <div className="oplog__container oplog__filters">
                    <OplogFilters />
                </div>
                <div className="oplog__container">
                    {entries}
                </div>
            </div>
        );
    };
}
