import styles from "./UserItem.module.css"
import userPhoto from '../../../../assets/images/user.png'
import {NavLink, useNavigate} from "react-router-dom";

const UserItem = ({user, followingInProgress, follow, unfollow, isAuth, setIsFollowed}) => {
    const navigate = useNavigate();
    const followUnfollowAuthCheck = (userId, apiMethod) => {
        if (!isAuth) {
            navigate("/login")
        } else {
            apiMethod(userId)
        }
    }
    const handleClick = (e) => {
        e.preventDefault();
    };
    return (
        <NavLink
            to={`/profile/${user.id}`}
            className={styles.wrapper}
            onFocus={() => setIsFollowed(user.followed)}
        >
            <div className={styles.profilePictureWrapper}>
                <img
                    src={user.photos.large || userPhoto} className={styles.profilePicture}
                    alt={"pfp"}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.infoTopPanel}>

                    <div className={styles.name}>{user.name}</div>
                    <button
                        className={user.followed
                            ? `${styles.followUnfollowButton} ${styles.followed}`
                            : styles.followUnfollowButton}
                        disabled={followingInProgress.some(id => id === user.id)}
                        onClick={(e) => {
                            handleClick(e)
                            followUnfollowAuthCheck(user.id, user.followed ? unfollow : follow)
                        }}
                    >
                        {user.followed ? "Followed" : "Follow"}
                    </button>
                </div>
                {user.status && <div className={styles.statusContainer}>
                    <div className={styles.status}>
                        {user.status}
                    </div>
                </div>}
            </div>


        </NavLink>)
}
export default UserItem;