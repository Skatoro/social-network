import React from "react";
import {connect} from "react-redux"
import {compose} from "redux";
import Messages from "./Messages";

export const MessagesContainer = ({currentDialog}) => {
    return (<Messages
        currentDialog={currentDialog}
    />)
}
