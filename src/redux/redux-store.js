import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import dialogsPageReducer from "./dialogsPageReducer";
import usersPageReducer from "./usersPageReducer";
import profilePageReducer from "./profilePageReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";
import postsReducer from "./postsReducer";

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    form: formReducer,
    posts: postsReducer,
    dialogsPage: dialogsPageReducer,
    usersPage: usersPageReducer,
    profilePage: profilePageReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;