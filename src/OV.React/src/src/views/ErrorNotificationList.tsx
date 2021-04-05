import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EventTypes } from '../models/EventTypes';
import { ServerErrorModel } from '../models/ServerErrorModel';
import EventHub from '../services/EventHub';

export class ErrorNotificationList extends React.Component {

    showToast = (error: ServerErrorModel) => {
        if(error?.errors?.length){
            error.errors.forEach(x => {
                toast.error(x)
            })
        }
    }

    componentDidMount() {
        EventHub.on(EventTypes.FETCH_ERROR, (error: object) => this.showToast(error as ServerErrorModel));
    }

    componentWillUnmount() {
        EventHub.off(EventTypes.FETCH_ERROR);
    }

    render() {
        return <ToastContainer
            position="bottom-right"
            autoClose={6000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
        />
    }
}
