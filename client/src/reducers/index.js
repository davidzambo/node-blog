import { combineReducers } from 'redux'
import navbar from './navbar'
import { posts } from './posts'
import { auth } from './auth';

export default combineReducers({
    auth,
    navbar,
    posts
})