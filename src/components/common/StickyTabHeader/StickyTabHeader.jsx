import React from "react";
import styles from "./StickyTabHeader.module.css"
import ReturnButton from "../Svg/SvgButton/ReturnButton";
import {useNavigate} from "react-router-dom";

const StickyTabHeader = ({titleName, subTitleName, subTitleNumber}) => {
    const navigate = useNavigate();
    const navigateBack = () => navigate(-1);

    return (
        <div className={styles.stickyHeaderContainer}>
            <div className={styles.stickyHeaderWrapper}>
                <div className={styles.stickyHeader}>
                    <ReturnButton navigateBack={navigateBack}/>
                    <div>
                        <div className={styles.title}>
                            {titleName}
                        </div>
                        {subTitleName && <div className={styles.subTitle}>
                            {subTitleName} {subTitleNumber}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StickyTabHeader;