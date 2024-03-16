import React from 'react';
import styles from "./SvgButton.module.css"

const CloseButton = ({closeDialog, colorWhite}) => {
    return (<div className={styles.svgButtonContainer}>
        <div className={colorWhite ? `${styles.svgButtonWrapper} ${styles.colorWhite}` : styles.svgButtonWrapper}
             onClick={closeDialog}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.svgButton}>
                <path
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </svg>
        </div>
    </div>)
}
export default CloseButton;