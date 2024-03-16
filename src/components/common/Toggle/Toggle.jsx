import React from "react";
import styles from "./Toggle.module.css"

const Toggle = ({setCallbackState, isActivated}) => {
    return (
        <div className={styles.toggleContainer} onClick={() => setCallbackState && setCallbackState(!isActivated)}>
            <div className={isActivated ? `${styles.toggleBody} ${styles.isActivated}` : styles.toggleBody}></div>
        </div>
    )
}

export default Toggle;