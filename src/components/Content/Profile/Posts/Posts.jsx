import styles from "./Posts.module.css"
import AddPostContainer from "./AddPost/AddPostContainer";
import PostContainer from "./Post/PostContainer";

const Posts = ({postList, pinnedIndex}) => {
    let postsElements = structuredClone(postList);


    postsElements = postsElements.map((post) => {
        let isPinned = pinnedIndex === post.id;

        return <PostContainer
            post={post}
            key={post.id}
            isPinned={isPinned}
        />
    })

    if (pinnedIndex !== null) {
        postsElements.push(postsElements[pinnedIndex])
        postsElements.splice(pinnedIndex, 1)
    }

    postsElements = postsElements.reverse()

    return (
        <div className={styles.postsWrapper}>
            <div className={styles.title}>
                Posts
            </div>
            <AddPostContainer/>
            <div className={styles.postsContainer}>
                {postsElements}
            </div>
        </div>
    )
}

export default Posts;