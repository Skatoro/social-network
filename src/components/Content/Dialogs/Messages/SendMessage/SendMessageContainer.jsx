import React from "react";
import SendMessage from "./SendMessage";
import {connect} from "react-redux"
import {sendMessageActionCreator, updateDraftActionCreator} from "../../../../../redux/dialogsPageReducer";
import {compose} from "redux";

class SendMessageContainer extends React.Component {
    render() {
        return (<SendMessage
            draft={this.props.draft}
            sendMessage={this.props.sendMessage}
            updateDraft={this.props.updateDraft}
            currentDialog={this.props.currentDialog}
        />)
    }
}
export default compose(
    connect(null, {
        sendMessage: sendMessageActionCreator,
        updateDraft: updateDraftActionCreator,
    })
)(SendMessageContainer)