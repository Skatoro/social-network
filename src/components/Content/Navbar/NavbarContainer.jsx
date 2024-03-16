import {connect} from "react-redux"
import React from "react";
import Navbar from "./Navbar";
import {toggleDarkModeActionCreator} from "../../../redux/app-reducer";
import {compose} from "redux";

const NavbarContainer = ({setDarkMode, isDarkMode}) => {

    return (<Navbar
        setDarkMode={setDarkMode}
        isDarkMode={isDarkMode}
    />)
}

let mapStateToProps = (state) => {
    return {
        isDarkMode: state.app.isDarkMode,
    }
}

export default compose(connect(mapStateToProps, {
    setDarkMode: toggleDarkModeActionCreator,
})(NavbarContainer))

