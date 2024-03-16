import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import ProfilePicture from "./ProfilePicture";

class ProfilePictureContainer extends React.Component {

    render() {
        return (<ProfilePicture
            shadow={this.props.shadow}
            profile={this.props.profile}
        />)
    }
}
let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}

export default compose(connect(mapStateToProps, null))(ProfilePictureContainer)
