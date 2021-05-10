import React from "react";
import Popup from 'reactjs-popup';
import "./modal.styl"
export interface PopupHostProps {
  isOpened: boolean;
  onClose: () => void;
  hideCloseButton?: boolean;
  className?: string;
}

export function Modal(props: React.PropsWithChildren<PopupHostProps>) {
  return <Popup position="right center" closeOnDocumentClick={false} closeOnEscape={false} modal={true} open={props.isOpened} className={`oplog-modal ${props.className ? props.className : ""}`}>
    {!props.hideCloseButton && <div className="oplog-modal__close-icon" onClick={props.onClose}></div>}
    {props.children}
  </Popup>
}