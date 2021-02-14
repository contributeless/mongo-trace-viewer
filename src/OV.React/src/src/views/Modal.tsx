import React from "react";
import Popup from 'reactjs-popup';
import "./modal.styl"
export interface PopupHostProps {
  isOpened: boolean;
}

export function Modal(props: React.PropsWithChildren<PopupHostProps>) {
    return <Popup position="right center" closeOnDocumentClick={false} closeOnEscape={false} modal={true} open={props.isOpened} className="oplog-modal">
      {props.children}
    </Popup>
}