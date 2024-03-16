import React from "react";
import styles from "./Preloader.module.css"

const Preloader = () => {
    return (<div className={styles.svgContainer}>
        <div className={styles.svgWrapper}>
            <svg x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0" className={styles.svg}>
                <circle fill="none"  strokeWidth="4" cx="50" cy="50" r="44" className={styles.bigCircle}/>
                <circle fill="#fff" stroke="#e74c3c" strokeWidth="3" cx="8" cy="54" r="6" className={styles.smallCircle}>
                    <animateTransform
                        attributeName="transform"
                        dur="2s"
                        type="rotate"
                        from="0 50 48"
                        to="360 50 52"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    </div>)
}

export default Preloader;