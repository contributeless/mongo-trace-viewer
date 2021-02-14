import React from "react";
import Popup from 'reactjs-popup';
import "./popupHost.styl"
export interface PopupHostProps {
  isOpened: boolean;
}

export function PopupHost(props: React.PropsWithChildren<PopupHostProps>) {
    return <Popup position="right center" closeOnDocumentClick={false} closeOnEscape={false} modal={true} open={props.isOpened} className="oplog-popup">
      {props.children}
    </Popup>
}