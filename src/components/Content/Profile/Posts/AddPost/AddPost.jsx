import React, {useState} from "react";
import styles from "./AddPost.module.css"
import {useForm} from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';
import DefaultProfilePicture from "../../../../../assets/images/user.png";

const MAX_POST_LENGTH = 280;
const MAX_WRITABLE_LENGTH = 310;

const AddPostForm = ({addPost, photoUrl}) => {
    photoUrl = photoUrl ? photoUrl : DefaultProfilePicture;

    const {
        register, handleSubmit, resetField, watch, formState: {errors, isDirty, isValid},
    } = useForm({
        defaultValues: {
            textBody: "",
        }
    })

    let isDisabled = !isDirty || !isValid;
    let [focused, setFocused] = useState(false);
    let messageLength = watch('textBody').length;
    const lowSymbols = MAX_POST_LENGTH * 0.2;
    const noSymbols = 0;
    let isLowSymbols = (MAX_POST_LENGTH - messageLength) <= lowSymbols;
    let isNoSymbols = (MAX_POST_LENGTH - messageLength) <= noSymbols;

    return (<form
        className={styles.container}
        onSubmit={handleSubmit((data) => {
            if (data.textBody) {
                addPost(data.textBody);
                resetField("textBody");
            }
        })}
    >
        <div className={styles.textareaWrapper}>
            <img src={photoUrl} alt={"pfpSmall"} className={styles.profilePicture}/>
            <TextareaAutosize
                {...register("textBody", {
                    maxLength: {
                        value: MAX_POST_LENGTH,
                    }
                })}
                maxLength={MAX_WRITABLE_LENGTH}
                className={errors.textBody?.message ? `${styles.error} ${styles.textarea}` : styles.textarea}
                placeholder={"What is happening?"}
                onClick={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            />
            <p>{errors.textBody?.message}</p>
        </div>
        <div className={styles.submitButtonWrapper}>
            {(focused || isDirty) && <div className={styles.lengthIndicatorWrapper}>
                <div className={`${styles.lengthIndicator}  ${isLowSymbols ? styles.lowSymbols : null} ${isNoSymbols ? styles.noSymbols : null}`}>
                    {MAX_POST_LENGTH - messageLength}
                </div>
            </div>}
            <button
                disabled={isDisabled}
                type={"submit"}
                className={`${styles.submitButton} ${isDisabled ? styles.disabledButton : null}`}
            >
                Post
            </button>
        </div>
    </form>)
}


const AddPost = ({addPost, photoUrl}) => {
    return (<div>
        <AddPostForm
            addPost={addPost}
            photoUrl={photoUrl}
        />
    </div>)
}


export default AddPost;