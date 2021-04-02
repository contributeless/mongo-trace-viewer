import React from "react";
import "./loader.styl";

export interface LoaderProps {

}

export function Loader(props: LoaderProps) {
    return <div className={`loader__container`}>
        <div className={`loader`}>Loading...</div>
    </div>;
}