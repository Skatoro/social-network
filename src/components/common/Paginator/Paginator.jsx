import styles from "./Paginator.module.css";
import React, {useState} from "react";

export const Paginator = ({currentPage, onPageChanged, pageSize, totalItemsCount, itemPortionSize}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let itemPortionCount = Math.ceil(pagesCount / itemPortionSize);
    let currentPortionIndexTemp = Math.ceil(currentPage / itemPortionSize);
    let [currentPortionIndex, setCurrentPortionIndex] = useState(currentPortionIndexTemp); // starts with 1 up to itemPortionCount
    let currentPortionFloor = currentPortionIndex * itemPortionSize - itemPortionSize + 1;
    let currentPortionCeiling = currentPortionIndex * itemPortionSize;

    let isFloorMinimum = currentPortionFloor <= 1;
    let isCeilingMaximum = currentPortionCeiling >= itemPortionCount;

    return (<div className={styles.paginationContainer}>
        <button
            onClick={() => setCurrentPortionIndex(currentPortionIndex - 1)}
            className={isFloorMinimum
                ? `${styles.paginationButton} ${styles.paginationButtonDisabled}`
                : styles.paginationButton}
            disabled={isFloorMinimum}
        >
            <svg  width="20" height="20" viewBox="0 0 50 50">
                <polyline points="35,10 15,25 35,40" strokeWidth="4" fill="none" />
            </svg>
        </button>

        {pages
            .filter(page => page >= currentPortionFloor && page <= currentPortionCeiling)
            .map(page => {
                return (<div
                    key={page}
                    className={currentPage === page ? `${styles.selectedPage} ${styles.paginationItem}` : styles.paginationItem}
                    onClick={() => onPageChanged(page)}
                >
                    <span>{page}</span>
                </div>)
            })}


        <button
            onClick={() => setCurrentPortionIndex(currentPortionIndex + 1)}
            className={isCeilingMaximum
                ? `${styles.paginationButton} ${styles.paginationButtonDisabled}`
                : styles.paginationButton}
            disabled={isCeilingMaximum}
        >
            <svg width="20" height="20" viewBox="0 0 50 50">
                <polyline points="15,10 35,25 15,40"  strokeWidth="4" fill="none" />
            </svg>
        </button>
    </div>)

}
