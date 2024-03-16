import {connect} from "react-redux";
import React from "react";
import Login from "./Login";
import {loginThunkCreator} from "../../redux/authReducer";

class LoginContainer extends React.Component {
    render() {
        return <>
            <Login
                login={this.props.login}
                isAuth={this.props.isAuth}
                captchaURL={this.props.captchaURL}
            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL,
    }
}

export default connect(mapStateToProps, {
    login: loginThunkCreator,
})(LoginContainer)
