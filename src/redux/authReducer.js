import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = "/authReducer/SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "/authReducer/GET_CAPTCHA_URL_SUCCESS";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    isIncorrectData: false,
    captchaURL: null,
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            }
        }
        default: {
            return state;
        }
    }
}

export const getCaptchaURLSuccess= (captchaURL) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: {
            captchaURL
        }
    }
}
export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: {
            userId,
            email,
            login,
            isAuth,
        }
    }
}
export const getUserAuthDataThunkCreator = () => async (dispatch) => {
    let response = await authAPI.getUserAuthData()

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginThunkCreator = (setError, email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getUserAuthDataThunkCreator())
    } else if (response.data.resultCode === 10) {
        dispatch(getCaptchaURLThunkCreator());
        setError("server", {
            type: "custom",
            message: response.data.messages,
        });
    } else {
        setError("server", {
            type: "custom",
            message: response.data.messages,
        });
    }
}
export const getCaptchaURLThunkCreator = () => async (dispatch) => {
    let response = await securityAPI.getCaptchaURL();
    const captchaURL = response.data.url;

    dispatch(getCaptchaURLSuccess(captchaURL));
}

export const logoutThunkCreator = () => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;