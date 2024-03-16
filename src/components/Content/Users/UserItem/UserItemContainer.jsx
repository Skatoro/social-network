import UserItem from "./UserItem";
import {connect} from "react-redux";
import {followThunkCreator, unfollowThunkCreator} from "../../../../redux/usersPageReducer";
import React from "react";
import {setIsFollowed} from "../../../../redux/profilePageReducer";

let mapStateToProps = (state) => {
    return {
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth,
    }
}
export default connect(mapStateToProps, {
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator,
    setIsFollowed: setIsFollowed,
}) (UserItem)
