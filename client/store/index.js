import {createStore, combineReducers, applyMiddleware} from 'redux'
// import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import notes from './notes'
import projects from './project-list'
import projectNotes from './project-view'
import searchedNotes from './search-view'
import previousPath from './path'

const reducer = combineReducers({user, projects, notes, projectNotes, searchedNotes, previousPath})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  // createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './notes'
export * from './project-list'
export * from './project-view'
export * from './search-view'
export * from './path'