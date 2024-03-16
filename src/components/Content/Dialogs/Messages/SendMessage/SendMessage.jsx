import React, {useEffect} from "react";
import styles from "./SendMessage.module.css"
import {useForm} from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';
import SendMessageIcon from "../../../../common/Svg/SvgImage/SendMessageIcon";

const AddMessageForm = ({draft, sendMessage, updateDraft, currentDialog}) => {
    let currentDialogId = currentDialog.dialogId;
    const {
        register, handleSubmit, resetField, setValue, watch,
    } = useForm()

    const onSubmit = (data) => {
        resetField("messageBody")
        updateDraft('', currentDialogId);

        data.messageBody = data.messageBody.trim();
        if (data.messageBody) {
            sendMessage(data.messageBody, currentDialogId)
        }
    }

    useEffect(() => {
        setValue("messageBody", draft)
    }, [draft])

    let currentDraft = watch("messageBody");
    let isDirty = !!currentDraft;

    return (<form
        className={styles.wrapper}
        onSubmit={handleSubmit(onSubmit)}
    >
        <TextareaAutosize
            {...register("messageBody", {
                onBlur: (e) => {
                    // костыль? onBlur срабатывает быстрее, чем происходит диспатч в стор, поэтому 200 мс, чтобы
                    // нивелировать это. Иначе будет мерцать.
                    setTimeout(() => updateDraft(e.target.value, currentDialogId), 200)
                },
            })}
            className={styles.messageTextarea}
            placeholder={"Start a new message"}
        />
        <button
            type={"submit"}
            className={!isDirty ? `${styles.sendButton} ${styles.isEmpty}` : styles.sendButton}
            value={"Send"}
            disabled={!isDirty}
        >
            <SendMessageIcon disabled={!isDirty}/>
        </button>
    </form>)
}

const SendMessage = ({draft, sendMessage, updateDraft, currentDialog}) => {
    return (<div className={styles.container}>
        <AddMessageForm
            draft={draft}
            sendMessage={sendMessage}
            updateDraft={updateDraft}
            currentDialog={currentDialog}
        />
    </div>)
}


export default SendMessage;