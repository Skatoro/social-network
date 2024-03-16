import {profileAPI} from "../api/api";

const SET_USER_PROFILE = "/profilePageReducer/SET-USER-PROFILE";
const SET_USER_STATUS = "/profilePageReducer/SET_USER_STATUS";
const SAVE_PHOTO_SUCCESS = "/profilePageReducer/SAVE_PHOTO_SUCCESS";
const SET_IS_FOLLOWED = "/profilePageReducer/SET_IS_FOLLOWED";

let initialState = {
    profile: null,
    status: "1111",
    isFollowed: null,
}
export const profilePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE: {
            action.profile.location = action.profile.aboutMe;
            delete action.profile.aboutMe;

            action.profile.location = action.profile.location === "Should be empty, but server wants it to be filled"
                ? null
                : action.profile.location;

            return {
                ...state,
                profile: action.profile,
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state,
                status: action.status,
            }
        }
        case SET_IS_FOLLOWED: {
            return {
                ...state,
                isFollowed: action.isFollowed,
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos},
            }
        }
        default: {
            return state;
        }

    }
}

export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile,
    }
}
export const setUserStatus = (status) => {
    return {
        type: SET_USER_STATUS,
        status,
    }
}
export const setIsFollowed = (value) => {
    return {
        type: SET_IS_FOLLOWED,
        isFollowed: value,
    }
}
export const saveProfilePictureSuccess = (photos) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
        photos,
    }
}
export const getUserProfileDataThunkCreator = (userId) => async (dispatch) => {
    if (userId) {
        let data = await profileAPI.getUserProfileData(userId)
        dispatch(setUserProfile(data));
    }
}
export const getUserStatusThunkCreator = (userId) => async (dispatch) => {
    if (userId) {
        let response = await profileAPI.getUserStatus(userId)
        dispatch(setUserStatus(response.data));
    }
}
export const updateUserStatusThunkCreator = (status, setError) => async (dispatch) => {
    let response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
        return true;
    } else {
        setError("server", {
            type: "custom",
            message: response.data.messages,
        });
        return false;
    }
}
export const saveProfilePictureThunkCreator = (profilePicture) => async (dispatch) => {
    let response = await profileAPI.saveProfilePicture(profilePicture)
    if (response.data.resultCode === 0) {
        dispatch(saveProfilePictureSuccess(response.data.data.photos));
    }
}
export const saveProfileThunkCreator = (profile, setError) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    profile.lookingForAJobDescription = false;
    profile.aboutMe = profile.aboutMe || "Should be empty, but server wants it to be filled";

    let response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileDataThunkCreator(userId));
        return true;
    } else {
        setError("server", {
            type: "custom",
            message: response.data.messages,
        });
        return false;
    }
}
export default profilePageReducer;