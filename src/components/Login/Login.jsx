import React from "react";
import {useForm} from "react-hook-form";
import {Navigate, useLocation} from "react-router-dom";
import styles from "./Login.module.css"
import InputCreator from "../common/InputCreator/InputCreator";

const LoginForm = (props) => {
    const {
        register, handleSubmit, clearErrors, setError, reset, watch, setFocus, formState: {errors},
    } = useForm({
        mode: "onBlur", defaultValues: {
            login: "", password: "", rememberMe: false, captcha: "",
        }
    })

    const onSubmit = async (data) => {
        props.login(setError, data.login, data.password, data.rememberMe, data.captcha,)
        reset({
            login: "", password: "", rememberMe: false, captcha: "",
        }, {keepErrors: true});

    }

    return (<form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
    >
        <InputCreator
            inputName={"login"} title={"Login"}
            required={"Login is required"}
            errors={errors} watch={watch} setFocus={setFocus} clearErrors={clearErrors} register={register}
        />
        <InputCreator
            inputName={"password"} title={"Password"} secured={true}
            required={"Password is required"}
            errors={errors} watch={watch} setFocus={setFocus} clearErrors={clearErrors} register={register}
        />
        {props.captchaURL && <div className={styles.captchaContainer}>
            <img src={props.captchaURL} alt={"captcha"} className={styles.captchaImage}/>
        </div>}
        {props.captchaURL && <InputCreator
            inputName={"captcha"} title={"Captcha"}
            required={"Captcha is required"}
            errors={errors} watch={watch} setFocus={setFocus} clearErrors={clearErrors} register={register}
        />}

        {errors.server && <p className={styles.errorMessage}>{errors.server.message.toString()}</p>}
        <div className={styles.checkboxBar}>
            <label>
                <input
                    className={styles.checkbox}
                    {...register("rememberMe",)}
                    type={"checkbox"}
                />
                <span className={styles.checkboxBarTitle}>Keep me signed in</span>
            </label>
        </div>
        <input type={"submit"} className={styles.submitButton} value={"Login"}/>
    </form>)
}


let Login = (props) => {
    let location = useLocation();
    if (props.isAuth) {
        return location?.state?.prevUrl ? <Navigate to={location?.state?.prevUrl}/> : <Navigate to={"/profile"}/>
    }


    return (<div className={styles.container}>
        <div className={styles.wrapper}>
            <span className={styles.title}>Login</span>
            <LoginForm login={props.login} captchaURL={props.captchaURL}/>
        </div>
    </div>)
}

export default Login;