import * as React from 'react';
import ReactJson from 'react-json-view'
import './oplog.styl'
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
          {<ReactJson src={entry} name={null} displayDataTypes={false} sortKeys={true}/>}
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
