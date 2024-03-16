import {connect} from "react-redux";
import React from "react";
import {
    saveProfilePictureThunkCreator,
    saveProfileThunkCreator,
    updateUserStatusThunkCreator
} from "../../../../../redux/profilePageReducer";
import ProfileDataForm from "./ProfileDataForm";

const ProfileDataFormContainer = (props) => {

    return (<ProfileDataForm
        profile={props.profile}
        status={props.status}
        goToNonEditMode={props.goToNonEditMode}
        saveProfile={props.saveProfile}
        updateStatus={props.updateStatus}
        saveProfilePicture={props.saveProfilePicture}
    />)
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
}
export default connect(mapStateToProps, {
    saveProfile: saveProfileThunkCreator,
    updateStatus: updateUserStatusThunkCreator,
    saveProfilePicture: saveProfilePictureThunkCreator,
},)(ProfileDataFormContainer)
