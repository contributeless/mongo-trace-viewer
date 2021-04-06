import React from "react";
import "./loader.styl";

export interface LoaderProps {
    isEnabled: boolean
}

export interface LoaderState {
    isFadeOutStarted: boolean
}

export class Loader extends React.Component<LoaderProps, LoaderState> {

    state: LoaderState = {
        isFadeOutStarted: false
    }

    componentDidUpdate(prevProps:LoaderProps, prevState:any){
        if(prevProps.isEnabled && !this.props.isEnabled){
            this.setState({
                isFadeOutStarted: true
            })

            setTimeout(() => {
                this.setState({
                    isFadeOutStarted: false
                })
            }, 1000)
        }
    }

    getClassName = () => {
        return `loader__container ${this.state.isFadeOutStarted ? "loader__container--fade-out" : ""} ${!this.state.isFadeOutStarted && !this.props.isEnabled ? "loader__container--hidden": ""}`
    }

    render() {
        return <div className={this.getClassName()}>
            <div className={`loader`}>Loading...</div>
        </div>;
    }
}