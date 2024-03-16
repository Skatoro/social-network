import React, {useState} from 'react';
import styles from "./ProfilePicture.module.css"
import userPhoto from "../../../../../assets/images/user.png";
import CloseButton from "../../../../common/Svg/SvgButton/CloseButton";

const ProfilePicture = ({profile, shadow}) => {
    let [enhancedMode, setEnhancedMode] = useState(false);

    if (enhancedMode) {
        document.body.classList.add(styles.lockedScrollbar);
    } else {
        document.body.classList.remove(styles.lockedScrollbar);
    }

    return (<div className={styles.profilePictureContainer}>
        <div className={styles.profilePictureWrapper}>
            <img
                src={profile.photos.large || userPhoto}
                alt={"profilePicture"}
                className={styles.profilePicture}
            />
            <div
                className={shadow ? [styles.profilePictureShadow, styles.shadowByDefault].join(" ") : styles.profilePictureShadow}
                onClick={() => setEnhancedMode(true)}
            >
            </div>
            {enhancedMode && <div className={styles.enhancedContainer}
                                  onClick={() => setEnhancedMode(false)}

            >
                <div className={styles.closeButtonWrapper}>
                    <CloseButton closeDialog={() => setEnhancedMode(false)} colorWhite={true}/>
                </div>
                <img
                    src={profile.photos.large || userPhoto}
                    alt={"profilePictureEnhanced"}
                    className={styles.profilePictureEnhanced}
                />
            </div>}

        </div>

    </div>)
}

export default ProfilePicture;