import {connect} from "react-redux";
import Post from "./Post";
import {
    deletePostActionCreator,
    disLikePostActionCreator,
    likePostActionCreator,
    pinPostActionCreator,
    unpinPostActionCreator
} from "../../../../../redux/postsReducer";
import React from "react";


class PostContainer extends React.Component {

    render() {
        return (<Post
            likePost={this.props.likePost}
            dislikePost={this.props.dislikePost}
            profile={this.props.profile}
            post={this.props.post}
            likesCount={this.props.post.likesCount}
            deletePost={this.props.deletePost}
            pinPost={this.props.pinPost}
            unpinPost={this.props.unpinPost}
            isPinned={this.props.isPinned}
        />)
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}

export default connect(mapStateToProps, {
    likePost: likePostActionCreator,
    dislikePost: disLikePostActionCreator,
    deletePost: deletePostActionCreator,
    pinPost: pinPostActionCreator,
    unpinPost: unpinPostActionCreator,
})(PostContainer)