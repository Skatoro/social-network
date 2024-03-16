import React from 'react';
import styles from "./ProfileHeader.module.css"

const ProfileHeader = () => {
    return (<div className={styles.profileHeader}>
        <img
            src={"https://i.pinimg.com/originals/7e/74/ca/7e74ca37c1f09fc8d4e0f38a110e3063.jpg"}
            className={styles.profileHeaderImage}
            alt={"profileHeader"}
        />
    </div>)
}

export default ProfileHeader;