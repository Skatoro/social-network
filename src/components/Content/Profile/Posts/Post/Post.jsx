import styles from "./Post.module.css"
import LikeIcon from "../../../../common/Svg/SvgImage/LikeIcon";
import ThreeDotsIcon from "../../../../common/Svg/SvgImage/ThreeDotsIcon";
import {useState} from "react";
import TrashCanIcon from "../../../../common/Svg/SvgImage/TrashCanIcon";
import PinIcon from "../../../../common/Svg/SvgImage/PinIcon";
import PinIconSmall from "../../../../common/Svg/SvgImage/PinIconSmall";
import DefaultProfilePicture from "../../../../../../src/assets/images/user.png"

const Post = ({likesCount, likePost, dislikePost, post, profile, deletePost, pinPost, unpinPost, isPinned}) => {
    let likeClick = () => {
        if (post.liked) {
            dislikePost(post.id)
        } else {
            likePost(post.id)
        }
    }
    let deleteClick = (e) => {
        e.stopPropagation()
        deletePost(post.id)
        setIsOptionShowed(false)
    }
    let pinClick = (e) => {
        e.stopPropagation()
        isPinned ? unpinPost() : pinPost(post.id)
        setIsOptionShowed(false)
    }
    let [isOptionShowed, setIsOptionShowed] = useState(false);

    let smallPhoto = profile.photos.small ? profile.photos.small : DefaultProfilePicture;

    return (<div className={styles.postContainer}>
        {isPinned ? <div className={styles.pinnedIndicator}><PinIconSmall/>Pinned post</div> : null}
        <div className={styles.postWrapper}>
            <div className={styles.profilePictureColumn}>
                <img src={smallPhoto} alt={"pfp"}/>
            </div>
            <div className={styles.dataColumn}>
                <div className={styles.topPanel}>
                    {profile.fullName}
                    <div onClick={() => setIsOptionShowed(true)} className={styles.optionsWrapper}>
                        <ThreeDotsIcon/>
                        <div className={`${styles.options} ${isOptionShowed && styles.displayBlock}`}>
                            <div className={`${styles.option} ${styles.optionDelete}`} onClick={deleteClick}>
                                <TrashCanIcon/>
                                Delete
                            </div>
                            <div className={styles.option} onClick={pinClick}>
                                <PinIcon/>
                                {isPinned ? "Unpin from top" : "Pin to top"}
                            </div>
                        </div>
                    </div>

                    <div
                        className={`${styles.closeOptionsBg} ${isOptionShowed && styles.displayBlock}`}
                        onClick={() => setIsOptionShowed(false)}
                    />
                </div>
                <div className={styles.textContainer}>
                    {post.message}
                </div>
                <div className={styles.likeContainer} onClick={likeClick}>
                    <div className={styles.likeWrapper}>
                        <LikeIcon pressed={post.liked}/>
                        <div className={`${styles.likeCounter} ${post.liked ? styles.liked : null}`}>
                            {likesCount !== 0 && <span>{likesCount}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>)
}

export default Post;