import React from "react";
import styles from "./Users.module.css";
import UserItemContainer from "./UserItem/UserItemContainer";
import {Paginator} from "../../common/Paginator/Paginator";
import StickyTabHeader from "../../common/StickyTabHeader/StickyTabHeader";
import {AdditionalSection} from "../../common/AdditionalSection/AdditionalSection";


let Users = ({users, currentPage, onPageChanged, pageSize, totalUsersCount, itemPortionSize}) =>  {
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
    if (screenWidth >= 420 && screenWidth <= 500) {     // Возможно такой лиснер слишком дорогой, но я не нашел
        itemPortionSize = 8;                            // другого способа корректно менять размер пагинатора
    } else if (screenWidth <= 420) {                    // Maybe setting listener on resize is too expensive, but
        itemPortionSize = 5;                            // I couldn't find any other way to set pagination`s width
    }
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
    }
    React.useEffect(() => {
        window.addEventListener("resize", handleResize, false);
    }, []);

    return (
        <div className={styles.usersContainer}>
            <div className={styles.usersWrapper}>
                <StickyTabHeader
                    titleName={"Users"}
                />
                {
                    users.map(user => <UserItemContainer user={user} key={user.id}/>)
                }
                <Paginator
                    currentPage={currentPage}
                    onPageChanged={onPageChanged}
                    pageSize={pageSize}
                    totalItemsCount={totalUsersCount}
                    itemPortionSize={itemPortionSize}
                />
            </div>

            <AdditionalSection/>
        </div>
    )
}

export default Users;