import { combineReducers } from 'redux';
import { NavbarReducer } from './navbar';
import { posts } from './posts';
import { auth } from './auth';
import { ConfirmReducer } from './confirm';
import { MatchReducer } from "./match";

export default combineReducers({
    auth,
    navbar: NavbarReducer,
    posts,
    confirm: ConfirmReducer,
    match: MatchReducer
})