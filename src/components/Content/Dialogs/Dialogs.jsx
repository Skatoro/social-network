import styles from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogItem";
import {Navigate, useLocation} from "react-router-dom";
import React from "react";
import {MessagesContainer} from "./Messages/MessagesContainer";
import StickyTabHeader from "../../common/StickyTabHeader/StickyTabHeader";


const Dialogs = ({dialogs, isAuth, currentDialogId}) => {
    let location = useLocation();
    if (!isAuth) {
        return <Navigate to={"/login"} state={{prevUrl: location.pathname}}/>
    }

    let dialogsElements = dialogs.map(dialog => <DialogItem
        key={dialog.dialogId}
        dialog={dialog}
    />)
    let currentDialog = dialogs[currentDialogId];
    return (
        <div className={styles.dialogsWrapper}>
            <div className={styles.bigScreen}>
                <div className={styles.dialogsElements}>
                    <StickyTabHeader
                        titleName={"Dialogs"}
                    />
                    {dialogsElements}
                </div>
                <MessagesContainer currentDialog={currentDialog}/>
            </div>
            <div className={styles.smallScreen}>
                {currentDialog
                    ? <MessagesContainer currentDialog={currentDialog} hasReturnButton={true}/>
                    : <>
                        <div className={styles.dialogsElements}>
                            <StickyTabHeader
                                titleName={"Dialogs"}
                            />
                            {dialogsElements}
                        </div>
                    </>
                }
            </div>
        </div>

    )
}

export default Dialogs;