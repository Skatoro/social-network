import React, {useState} from 'react';
import styles from "./InputCreator.module.css"

const InputCreator = ({
                          inputName,
                          maxInputLength = null,
                          title,
                          required,
                          errors,
                          watch,
                          setFocus,
                          clearErrors,
                          register,
                          secured = false,
                      }) => {
    let [focusedName, setFocusedName] = useState(null);

    const getInputLength = (inputSelector) => watch(inputSelector) ? watch(inputSelector).length : 0;

    const calcInputTitleClass = (inputName, {
        defaultStyle = null,
        focusedStyle = null,
        filledStyle = null,
        errorStyle = null,
        inputErrorFocused = null,
        inputTitleErrorFocused = null
    }, required) => {
        let error = required && errors[inputName]?.message && errorStyle || null;
        let focused = focusedName === inputName && focusedStyle || null
        let filled = watch(inputName) && filledStyle || null

        let focusedInputError = errors[inputName]?.message && focused && inputErrorFocused || null;
        let focusedTitleError = errors[inputName]?.message && focused && inputTitleErrorFocused || null;

        return [defaultStyle, focused, filled, error, focusedInputError, focusedTitleError].join(" ");
    }
    return (
        <div className={styles.inputContainer}>
            <div
                className={calcInputTitleClass(inputName, {
                    defaultStyle: styles.inputWrapper,
                    focusedStyle: styles.inputFocused,
                    errorStyle: styles.inputError,
                    inputErrorFocused: styles.inputErrorFocused,
                }, required)}
                onClick={() => setFocus(inputName)}
            >
                <div className={styles.inputTitleWrapper}>
                    <div
                        className={calcInputTitleClass(inputName, {
                            defaultStyle: styles.inputTitle,
                            focusedStyle: styles.inputTitleFocused,
                            filledStyle: styles.inputTitleFilled,
                            inputTitleErrorFocused: styles.inputTitleErrorFocused,
                        }, required)}
                    >
                        {title}
                    </div>
                    {focusedName === inputName && maxInputLength && <div className={styles.wordCounter}>
                        {getInputLength(inputName)} / {maxInputLength}
                    </div>}
                </div>
                <input className={secured ? `${styles.input} ${styles.secured}` : styles.input}
                       {...register(inputName, {
                           required: required,
                           maxLength: {
                               value: maxInputLength,
                               message: `Max length is ${maxInputLength}`
                           }
                       })}
                       onFocus={(e) => {
                           setFocusedName(e.target.name)
                           clearErrors(["server"])
                       }}
                       onBlur={() => {
                           setFocusedName(null)
                       }}
                       maxLength={maxInputLength || 1000}
                />
            </div>
            {errors[inputName] && <p className={styles.errorMessage}>{errors[inputName]?.message}</p>}
        </div>
    )
}

export default InputCreator;