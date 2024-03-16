import {connect} from "react-redux"
import React from "react";
import {compose} from "redux";
import Settings from "./Settings";
import {toggleDarkModeActionCreator} from "../../../../redux/app-reducer";
import {getUserProfileDataThunkCreator} from "../../../../redux/profilePageReducer";
import {logoutThunkCreator} from "../../../../redux/authReducer";

const SettingsContainer = ({
                               setDarkMode,
                               isDarkMode,
                               setSettingsOpened,
                               userName,
                               authorizedUserId,
                               getUserProfileData,
                               isAuth,
                               logout
                           }) => {
    !userName && getUserProfileData(authorizedUserId)
    return (<Settings
        setDarkMode={setDarkMode}
        isDarkMode={isDarkMode}
        setSettingsOpened={setSettingsOpened}
        userName={userName}
        isAuth={isAuth}
        logout={logout}
    />)
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state?.profilePage?.profile?.fullName,
        authorizedUserId: state.auth.userId,
        isDarkMode: state.app.isDarkMode,
    }
}

export default compose(connect(mapStateToProps, {
    setDarkMode: toggleDarkModeActionCreator,
    getUserProfileData: getUserProfileDataThunkCreator,
    logout: logoutThunkCreator,
})(SettingsContainer))

