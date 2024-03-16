import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

let mapStateToPropsForAuth = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Navigate to={"/login"}/>
            }
            return <Component {...this.props}/>
        }
    }


    return connect(mapStateToPropsForAuth)(RedirectComponent);
}