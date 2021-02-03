import * as React from 'react';
import { OplogViewer } from './OplogViewer';
import { ConfigService } from './Services/ConfigService';
import { OplogService } from './Services/OplogService';

type Props = {

};
type State = {
   isDbConnectionConfigured: boolean,
   oplog: object[]
};

export class App extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            isDbConnectionConfigured: true,
            oplog: []
        }
    }

    async componentDidMount(){
        const response = await ConfigService.getConfigStatus();

        const oplog = await OplogService.getOplog();

        this.setState({
            isDbConnectionConfigured: response.isConfigured,
            oplog: oplog.items
        })
    }

    render() {
        return (
            <div>
                <div>Is connection string present: {this.state.isDbConnectionConfigured.toString()}</div>
                <br />
                <OplogViewer entries={this.state.oplog}></OplogViewer>
            </div>
        );
    };
}
