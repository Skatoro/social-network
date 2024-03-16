const ADD_POST = "/feedPageReducer/ADD_POST";
const LIKE_POST = "/feedPageReducer/LIKE_POST";
const DISLIKE_POST = "/feedPageReducer/DISLIKE_POST";
const PIN_POST = "/feedPageReducer/PIN_POST";
const UNPIN_POST = "/feedPageReducer/UNPIN_POST";
const DELETE_POST = "/feedPageReducer/DELETE_POST";

let initialState = {
    postList: [
        {id: 0, message: "Local state posts. A placeholder for possible server-side introduction",
            likesCount: 18, liked: false, isOptionsOpened: false},
        {id: 1, message: "Посты из локального стейта. Заглушка до возможного введения серверной части",
            likesCount: 17, liked: true, isOptionsOpened: false},
        {id: 2, message: "bruh",
            likesCount: 0, liked: false, isOptionsOpened: false},
    ],
    newPostText: '',
    lastId: 2,
    pinnedIndex: null,
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ( ADD_POST ): {
            state.lastId += 1;
            let newPost = {
                id: state.lastId,
                message: action.text,
                likesCount: 0,
            };
            return {
                ...state,
                postList: [...state.postList, newPost],
            };
        }
        case ( LIKE_POST ): {
            let postIndex = action.postIndex;
            let likesCount = state.postList.find(post => post.id === postIndex).likesCount;
            return {
                ...state,
                postList: state.postList.map((post) => post.id === postIndex
                    ? {...post, likesCount: likesCount + 1, liked: true}
                    : post)
            };
        }
        case ( DISLIKE_POST ): {
            let postIndex = action.postIndex;
            let likesCount = state.postList.find(post => post.id === postIndex).likesCount;
            return {
                ...state,
                postList: state.postList.map((post) => post.id === postIndex
                    ? {...post, likesCount: likesCount - 1, liked: false}
                    : post)
            };
        }
        case ( PIN_POST ): {
            let postIndex = action.postIndex;
            return {
                ...state,
                pinnedIndex: postIndex,
            };
        }
        case ( UNPIN_POST ): {
            return {
                ...state,
                pinnedIndex: null,
            };
        }
        case ( DELETE_POST ): {
            let postIndex = action.postIndex;
            let newPostList = structuredClone(state.postList);
            newPostList.splice(postIndex, 1)
            return {
                ...state,
                postList: newPostList,
            };
        }
        default: {
            return state;
        }

    }
}

// Action Creators

export const addPostActionCreator = (text) => {
    return {
        type: ADD_POST,
        text,
    }
}

export const likePostActionCreator = (postIndex) => {
    return {
        type: LIKE_POST,
        postIndex,
    }
}
export const disLikePostActionCreator = (postIndex) => {
    return {
        type: DISLIKE_POST,
        postIndex,
    }
}
export const pinPostActionCreator = (postIndex) => {
    return {
        type: PIN_POST,
        postIndex,
    }
}
export const unpinPostActionCreator = () => {
    return {
        type: UNPIN_POST,
    }
}
export const deletePostActionCreator = (postIndex) => {
    return {
        type: DELETE_POST,
        postIndex,
    }
}

export default postsReducer;