import * as React from 'react';
import { OplogListContainer } from './views/OplogListContainer';
import { ConfigService } from './services/ConfigService';
import { Provider } from 'unstated';
import { OplogFilterContainer } from './state/OplogFilterContainer';
import { OplogContainer } from './state/OplogContainer';

type Props = {

};
type State = {
   isDbConnectionConfigured: boolean,

};

export class App extends React.Component<Props, State> {
    filterContainer: OplogFilterContainer;
    oplogContainer: OplogContainer;
    constructor(props: Props){
        super(props);
        this.filterContainer = new OplogFilterContainer();
        this.oplogContainer = new OplogContainer(this.filterContainer);
        this.state = {
            isDbConnectionConfigured: true,
        }
    }

    async componentDidMount(){

        await this.filterContainer.initialize();
        await this.oplogContainer.initialize();

        const response = await ConfigService.getConfigStatus();
        this.setState({
            isDbConnectionConfigured: response.isConfigured,
        })
    }

    render() {
        return (
            <Provider inject={[this.filterContainer, this.oplogContainer]}>
                {/* <div>Is connection string present: {this.state.isDbConnectionConfigured.toString()}</div> */}
                <OplogListContainer />
            </Provider>
        );
    };
}
