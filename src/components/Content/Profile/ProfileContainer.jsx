import {connect} from "react-redux";
import React from "react";
import Profile from "./Profile";
import {getUserProfileDataThunkCreator, getUserStatusThunkCreator} from "../../../redux/profilePageReducer";
import {compose} from "redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export function withRouter(Component) {                // hardcoded react-router v5->v6 transition for classes
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return (<Component
            {...props}
            router={{location, navigate, params}}
        />);
    }

    return ComponentWithRouterProp;
}


class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.router.params.userId;
        userId ||= this.props.authorizedUserId;

        this.props.getUserProfileData(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.router.params.userId !== this.props.router.params.userId) {
            this.refreshProfile();
        }
    }


    render() {
        let isOwner = !this.props.router.params.userId
            ? true
            : parseInt(this.props.router.params.userId) === this.props.authorizedUserId;
        return (<Profile
            {...this.props}
            isOwner={isOwner}
            profile={this.props.profile}
            postAmount={this.props.postAmount}
        />)
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        userStatus: state.profilePage.userStatus,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
        postAmount: state.posts.postList.length,
    }
}

export default compose(connect(mapStateToProps, {
    getUserProfileData: getUserProfileDataThunkCreator, getUserStatus: getUserStatusThunkCreator,
}), withRouter,)(ProfileContainer)
