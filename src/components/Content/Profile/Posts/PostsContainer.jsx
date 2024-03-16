import {connect} from "react-redux";
import Posts from "./Posts";

let mapStateToProps = (state) => {
    return {
        postList: state.posts.postList,
        pinnedIndex: state.posts.pinnedIndex,
    }
}

const PostsContainer = connect(mapStateToProps, {
}) (Posts)

export default PostsContainer;