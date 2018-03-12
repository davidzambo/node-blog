import { combineReducers } from 'redux'
import navbar from './navbar'
import { posts } from './posts'

export default combineReducers({
  navbar,
  posts
})