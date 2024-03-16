import styles from "./DialogItem.module.css"
import {NavLink} from "react-router-dom";
import DefaultUserPicture from "../../../../../src/assets/images/user.png";

const DialogItem = ({dialog}) => {
    let path = "/dialogs/" + dialog.dialogId;
    let draft = dialog.draft;
    let lastMessage = dialog?.messages?.slice(-1)[0]?.message;
    let lastMessageSender = dialog?.messages?.slice(-1)[0]?.sender;
    let underMessage = draft ? draft : lastMessage;
    let underMessageStyle;
    if (draft) {
        underMessageStyle = styles.userLastMessage;
    } else if (lastMessageSender === "user") {
        underMessageStyle = styles.userLastMessage;
    } else if (lastMessageSender === "opponent") {
        underMessageStyle = styles.opponentLastMessage;
    } else {
        underMessageStyle = null;
    }

    return (<div className={styles.dialogItemContainer}>
        <NavLink to={path}
                 className={navData => navData.isActive ? `${styles.active} ${styles.dialogItemWrapper}` : styles.dialogItemWrapper}
        >
            <img src={DefaultUserPicture} alt={"pfp"} className={styles.dialogPicture}/>

            <div className={styles.dialogInfo}>
                {dialog.name}
                <div className={underMessageStyle}>
                    {underMessage &&
                        <div className={styles.underMessageWrapper}>
                            {draft &&
                                <div className={styles.draft}>
                                    Draft:
                                </div>
                            }
                            <div className={styles.underMessage}>
                                {underMessage}
                            </div>
                        </div>
                    }
                </div>
            </div>

        </NavLink>
    </div>)
}

export default DialogItem;