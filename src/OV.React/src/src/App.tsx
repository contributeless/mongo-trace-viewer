import * as React from 'react';
import { PrefillResponse } from './models/PrefillResponse';
import { OplogEntry, OplogViewer } from './OplogViewer';
import { ConfigService } from './Services/ConfigService';
import { OplogService } from './Services/OplogService';

type Props = {

};
type State = {
   isDbConnectionConfigured: boolean,
   oplog: OplogEntry[],
   prefillInfo: PrefillResponse
};

export class App extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            isDbConnectionConfigured: true,
            oplog: [],
            prefillInfo: {
                databases: []
            }
        }
    }

    async componentDidMount(){
        const response = await ConfigService.getConfigStatus();

        const oplog = await OplogService.getOplog({
            database: "AuthAndBudget",
            collection: "Authorization",
            id: null
        });

        const prefillResponse = await OplogService.prefill();

        this.setState({
            isDbConnectionConfigured: response.isConfigured,
            oplog: oplog.items,
            prefillInfo: prefillResponse
        })
    }

    render() {
        return (
            <div>
                {/* <div>Is connection string present: {this.state.isDbConnectionConfigured.toString()}</div> */}
                {/* <br /> */}
                {/* <div>{JSON.stringify(this.state.prefillInfo)}</div> */}
                {/* <br /> */}
                <OplogViewer entries={this.state.oplog}></OplogViewer>
            </div>
        );
    };
}
