import styles from "./MessageItem.module.css"

const MessageItem = ({message}) => {
    // Два блока с тернаркой, а не один с выбором стиля,
    // чтобы на будущее если появятся другие варианты, их было легче вставлять
    // Two divs with ternary choices, instead of one with classname choice
    // so it would be easier in the future to add more options
    return (
        <>
            {message.sender === "user" ?
                <div className={styles.userMessageWrapper}>
                    <div className={styles.userMessage}>
                        {message.message}
                    </div>
                </div> : null}
            {message.sender === "opponent" ?
                <div className={styles.opponentMessageWrapper}>
                    <div className={styles.opponentMessage}>
                        {message.message}
                    </div>
                </div> : null}
        </>)
}

export default MessageItem;