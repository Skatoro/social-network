import React from 'react';
import styles from "./SendMessageIcon.module.css"

const SendMessageIcon = ({disabled}) => {
    return (
        <div className={disabled ? `${styles.disabled} ${styles.wrapper}` : styles.wrapper }>
            <svg viewBox="0 0 24 24" aria-hidden="true"
                 className={styles.sendMessageIcon}
            >
                <g>
                    <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
                </g>
            </svg>
        </div>
    )
}

export default SendMessageIcon;