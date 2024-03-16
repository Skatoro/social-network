import {followAPI, userAPI} from "../api/api";

const SET_USERS = "/usersPageReducer/SET_USERS";
const FOLLOW = "/usersPageReducer/FOLLOW";
const UNFOLLOW = "/usersPageReducer/UNFOLLOW";
const SET_CURRENT_PAGE = "/usersPageReducer/SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "/usersPageReducer/SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "/usersPageReducer/TOGGLE_IS_FETCHING";
const TOGGLE_FOLLOWING_IN_PROGRESS = "/usersPageReducer/TOGGLE_FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    itemPortionSize: 10,
}

export const usersPageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            };
        }
        case FOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {...user, followed: true};
                    }
                    return user;
                })
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userID) {
                        return {...user, followed: false};
                    }
                    return user;
                })
            };
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.followingInProgress
                    ? [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id !== action.userId)]
            }
        }
        default: {
            return state;
        }
    }
}

export const followSuccess = (userID) => ({
    type: FOLLOW,
    userID,
})
export const unfollowSuccess = (userID) => ({
    type: UNFOLLOW,
    userID,
})
export const setUsers = (users) => ({
    type: SET_USERS,
    users,
})
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
})
export const setTotalUsersCount = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
})
export const toggleIsFetching = (value) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: value,
})
export const toggleFollowingInProgress = (value, userId) => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    followingInProgress: value,
    userId,
})
const followUnfollowFlow = async (dispatch, apiMethod, userId, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userId))
    let response = await apiMethod(userId)

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingInProgress(false, userId))
}
export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));

    let data = await userAPI.getUsers(currentPage, pageSize);

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

export const followThunkCreator = (userId) => async (dispatch) => {
    let apiMethod = followAPI.followUser.bind(followAPI);

    await followUnfollowFlow(dispatch, apiMethod, userId, followSuccess)
}
export const unfollowThunkCreator = (userId) => async (dispatch) => {
    let apiMethod = followAPI.unfollowUser.bind(followAPI);

    await followUnfollowFlow(dispatch, apiMethod, userId, unfollowSuccess)
}

export default usersPageReducer;