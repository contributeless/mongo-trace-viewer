import * as React from 'react';

export interface OplogEntry {

}

type Props = {
    entries: OplogEntry[]
};
type State = {

};

export class OplogViewer extends React.Component<Props, State> {
    
    createEntryView = (entry:OplogEntry, index: number) => {
      return <div className="oplog__item" key={index}>
          {JSON.stringify(entry)}
      </div>;
    }

    render() {
        const entries = this.props.entries.map(this.createEntryView);

        return (
            <div className="oplog__container">
                {entries}
            </div>
        );
    };
}
