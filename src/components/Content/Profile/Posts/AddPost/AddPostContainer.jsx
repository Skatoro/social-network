import React from "react";
import AddPost from "./AddPost";
import {connect} from "react-redux";
import {addPostActionCreator} from "../../../../../redux/postsReducer";

let mapStateToProps = (state) => {
    return {
        photoUrl: state.profilePage.profile.photos.small,
    }
}

const AddPostContainer = connect(mapStateToProps, {
    addPost: addPostActionCreator,
}) (AddPost)


export default AddPostContainer;