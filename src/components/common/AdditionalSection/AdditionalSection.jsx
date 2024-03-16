import styles from "./AdditionalSection.module.css";
import React from "react";

export const AdditionalSection = ({}) => {

    return(<div className={styles.suggestionContainer}>
        <div className={styles.peopleSuggestion}>
            <span>You might like</span>
            <div className={styles.commentary}>Заглушка на будущее</div>
        </div>
        <div className={styles.trendSuggestion}>
            <span>Trends for you</span>
            <div className={styles.commentary}>A placeholder for future</div>
        </div>
    </div>);
}
