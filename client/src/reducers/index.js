import { combineReducers } from 'redux';
import { navbar } from './navbar';
import { posts } from './posts';
import { auth } from './auth';
import { confirm } from './confirm';
import { match } from "./match";
import { gallery } from "./gallery";

export default combineReducers({
    auth,
    navbar,
    posts,
    confirm,
    match,
    gallery
})