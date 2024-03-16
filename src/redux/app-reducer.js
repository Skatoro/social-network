import {getUserAuthDataThunkCreator} from "./authReducer";
const SET_DARK_MODE = "/globalReducer/SET_DARK_MODE";
const SUCCESSFUL_INITIALIZATION = "/app-reducer/SUCCESSFUL_INITIALIZATION";

let initialState = {
    initialized: false,
    isDarkMode: true,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUCCESSFUL_INITIALIZATION: {
            return {
                ...state,
                initialized: true,
            }
        }
        case SET_DARK_MODE: {
            return {
                ...state,
                isDarkMode: action.isDarkMode,
            }
        }
        default: {
            return state;
        }
    }
}

const setSuccessfulInitialization = () => {
    return {
        type: SUCCESSFUL_INITIALIZATION,
    }
}

export const toggleDarkModeActionCreator = (isDarkMode) => {
    return {
        type: SET_DARK_MODE,
        isDarkMode,
    }
}
export const initializeApp = () => (dispatch) => {
    let getUserDataPromise = dispatch(getUserAuthDataThunkCreator());

    Promise.all([getUserDataPromise]).then(() => {
        dispatch(setSuccessfulInitialization());
    })
}


export default appReducer;