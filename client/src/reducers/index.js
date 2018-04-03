import { combineReducers } from 'redux'
import navbar from './navbar'
import { posts } from './posts'
import { auth } from './auth';
import { ConfirmReducer } from './confirm';
import {MatchReducer} from "./match";

export default combineReducers({
    auth,
    navbar,
    posts,
    confirm: ConfirmReducer,
    match: MatchReducer
})