import {connect} from "react-redux";
import React from "react";
import {compose} from "redux";
import ProfileInfo from "./ProfileInfo";
import {followThunkCreator, unfollowThunkCreator} from "../../../../redux/usersPageReducer";
import {setIsFollowed} from "../../../../redux/profilePageReducer";

let ProfileInfoContainer = (props) => {

    return (<ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        followingInProgress={props.followingInProgress}
        isAuth={props.isAuth}
        follow={props.follow}
        unfollow={props.unfollow}
        isFollowed={props.isFollowed}
        setIsFollowed={props.setIsFollowed}
    />)
}
const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth,
        isFollowed: state.profilePage.isFollowed,
    }
}
export default compose(connect(mapStateToProps, {
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator,
    setIsFollowed: setIsFollowed,
},)(ProfileInfoContainer))
