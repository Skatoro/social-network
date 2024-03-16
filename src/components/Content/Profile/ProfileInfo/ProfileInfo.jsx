import React, {useState} from "react";
import styles from "./ProfileInfo.module.css"
import GithubPanel from "./DataPanel/GithubPanel";
import LocationPanel from "./DataPanel/LocationPanel";
import ProfilePictureContainer from "./ProfilePicture/ProfilePictureContainer";
import ProfileDataFormContainer from "./ProfileDataForm/ProfileDataFormContainer";
import WebsitePanel from "./DataPanel/WebsitePanel";
import {useNavigate} from "react-router-dom";

const ProfileInfo = ({isOwner, profile, status, followingInProgress, follow, unfollow, isAuth, isFollowed, setIsFollowed}) => {
    let [editMode, setEditMode] = useState(false);
    if (editMode) {
        document.body.classList.add(styles.lockedScrollbar);
    } else {
        document.body.classList.remove(styles.lockedScrollbar);
    }
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
    return (<div className={styles.profileInfoContainer}>
        <div className={styles.topInfoPanel}>
            <ProfilePictureContainer/>
            {isOwner
                ? <div className={styles.editProfileButtonWrapper}>
                    <button
                        className={styles.editProfileButton}
                        onClick={() => {
                            setEditMode(true)
                        }}
                    >
                        <span>Edit profile</span>
                    </button>
                </div>
                : <button
                    className={isFollowed
                        ? `${styles.followButton} ${styles.followed}`
                        : styles.followButton}
                    disabled={followingInProgress.some(id => id === profile.userId)}
                    onClick={(e) => {
                        handleClick(e)
                        setIsFollowed(!isFollowed)
                        followUnfollowAuthCheck(profile.userId, isFollowed ? unfollow : follow)
                    }}
                >
                    {isFollowed ? "Followed" : "Follow"}
                </button>
            }

        </div>

        <div className={styles.name}>
            <span>{profile.fullName}</span>
        </div>

        {status &&
            <div className={styles.statusWrapper}>
                <span className={styles.status}>
                    {status}
                </span>
            </div>}

        <ProfileData profile={profile}/>

        {editMode &&
            <div className={styles.editProfileContainer}>
                <div className={styles.editProfileBgShadow}></div>
                <div className={styles.scrollbarDecorator}>
                    <div className={styles.editProfileWrapper}>
                        <ProfileDataFormContainer goToNonEditMode={() => setEditMode(false)}/>
                    </div>
                </div>
            </div>
        }
    </div>)
}


const ProfileData = ({profile}) => {
    return (<div className={styles.dataContainer}>
        {profile.contacts.website &&
            <WebsitePanel profile={profile}/>
        }

        {profile.location &&
            <LocationPanel profile={profile}/>
        }

        {profile.contacts.github &&
            <GithubPanel profile={profile}/>
        }

    </div>)
}

export default ProfileInfo;