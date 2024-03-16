import React from 'react';
import styles from "./ThreeDotsIcon.module.css"

const ThreeDotsIcon = ({}) => {
    return (
        <div className={styles.wrapper}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.threeDotsIcon}>
                <g>
                    <path
                        d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                </g>
            </svg>
        </div>
    )
}

export default ThreeDotsIcon;