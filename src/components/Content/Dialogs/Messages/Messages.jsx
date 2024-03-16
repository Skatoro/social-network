import styles from "./Messages.module.css"
import React from "react";
import MessageItem from "./MessageItem/MessageItem";
import SendMessageContainer from "./SendMessage/SendMessageContainer";
import StickyTabHeader from "../../../common/StickyTabHeader/StickyTabHeader";
import DefaultUserPicture from "../../../../assets/images/user.png"

const Messages = ({currentDialog}) => {
    let messagesElements = currentDialog?.messages.map(message => <MessageItem
        key={message.messageId}
        message={message}
    />)
    return (<>
        <div className={styles.container}>
            {currentDialog
                ? <>
                    <div className={styles.wrapper}>
                        <div className={styles.stickyTabHeader}>
                            <StickyTabHeader
                                titleName={currentDialog.name}
                            />
                        </div>
                        <div className={styles.messagesElementsContainer}>
                            <div className={styles.messagesElements}>
                                <div className={styles.messagesElementsWrapper}>
                                    <div className={styles.messagesOpponentPreview}>
                                        <img src={DefaultUserPicture} alt={"profile image"}/>
                                        <span>{currentDialog.name}</span>
                                    </div>
                                    {messagesElements}
                                </div>
                            </div>
                            <SendMessageContainer
                                currentDialog={currentDialog}
                                draft={currentDialog.draft}
                            />
                        </div>
                    </div>
                </>
                : <div className={styles.selectMessage}>
                    <span>Select a message</span>
                </div>

            }

        </div>
    </>)
}

export default Messages;