import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import styles from "./Profile.module.css"
import ProfileInfoContainer from "./ProfileInfo/ProfileInfoContainer";
import {Navigate, useLocation} from "react-router-dom";
import PostsContainer from "./Posts/PostsContainer";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import StickyTabHeader from "../../common/StickyTabHeader/StickyTabHeader";
import {AdditionalSection} from "../../common/AdditionalSection/AdditionalSection";


let Profile = ({profile, isOwner, isAuth, postAmount}) => {
    let location = useLocation();
    if (!isAuth && isOwner) {
        return <Navigate to={"/login"} state={{prevUrl: location.pathname}}/>
    }

    if (!profile) {
        return (<Preloader/>)
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <StickyTabHeader
                    titleName={profile.fullName}
                    subTitleName={isOwner && postAmount && "posts"}
                    subTitleNumber={isOwner && postAmount && postAmount}
                />

                <ProfileHeader/>

                <ProfileInfoContainer isOwner={isOwner}/>

                {isOwner && <PostsContainer/>}
            </div>

            <AdditionalSection/>
        </div>)
}

export default Profile;