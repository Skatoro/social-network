import Dialogs from "./Dialogs";
import {connect} from "react-redux"
import {compose} from "redux";
import React from "react";
import {withRouter} from "../Profile/ProfileContainer";

export const DialogsContainer = ({dialogs, isAuth, router}) => {

    return (<Dialogs
        currentDialogId={router.params.dialogId}
        dialogs={dialogs}
        isAuth={isAuth}
    />)
}

let mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsPage.dialogs, isAuth: state.auth.isAuth,
    }
}


export default compose(connect(mapStateToProps, null), withRouter,)(DialogsContainer)


