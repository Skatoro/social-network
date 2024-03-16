import React from 'react';
import styles from "./SvgButton.module.css"

const ReturnButton = ({navigateBack}) => {
    return (<div className={styles.svgButtonContainer}>
        <div className={styles.svgButtonWrapper} onClick={navigateBack}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.svgButton}>
                <g>
                    <path
                        d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                </g>
            </svg>
        </div>
    </div>)
}
export default ReturnButton;