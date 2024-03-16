import feedPageReducer from "./feedPageReducer";
import dialogsPageReducer from "./dialogsPageReducer";

let store = {
    _state: {
        feedPage: {
            posts: [
                {id: 1, message: "bruh", likesCount: "12"},
                {id: 2, message: "Hanlo", likesCount: "17"},
                {id: 3, message: "Everynyan", likesCount: "18"},
            ],
            newPostText: '',
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: "Andrew"},
                {id: 2, name: "Stas"},
                {id: 3, name: "Denis"},
            ],
            messages: [
                {id: 1, message: "Henlo"},
                {id: 2, message: "everynyan"},
            ],
            newMessageText: '',
        },
    },
    _callSubscriber() {
        console.log("Subscriber has not been called")
    },


    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.feedPage = feedPageReducer(this._state.feedPage, action);
        this._state.dialogsPage = dialogsPageReducer(this._state.dialogsPage, action);

        this._callSubscriber(this._state)
    },
}


window.store = store;
export default store;