import {connect} from "react-redux"
import React from "react";
import {compose} from "redux";
import Settings from "./Settings";
import {toggleDarkModeActionCreator} from "../../../../redux/app-reducer";
import {logoutThunkCreator} from "../../../../redux/authReducer";

const SettingsContainer = ({
                               setDarkMode,
                               isDarkMode,
                               setSettingsOpened,
                               authUserLogin,
                               isAuth,
                               logout
                           }) => {

    return (<Settings
        setDarkMode={setDarkMode}
        isDarkMode={isDarkMode}
        setSettingsOpened={setSettingsOpened}
        userName={authUserLogin}
        isAuth={isAuth}
        logout={logout}
    />)
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        authUserLogin: state.auth.login,
        isDarkMode: state.app.isDarkMode,
    }
}

export default compose(connect(mapStateToProps, {
    setDarkMode: toggleDarkModeActionCreator,
    logout: logoutThunkCreator,
})(SettingsContainer))

