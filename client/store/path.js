/**
 * ACTION TYPES
 */
const SET_PATH = 'SET_PATH'

/**
 * INITIAL STATE
 */
const defaultPath = ''

/**
 * ACTION CREATORS
 */
const setPath = path => ({type: SET_PATH, path})

/**
 * THUNK CREATORS
 */
export const setPathThunk = (path) =>
    dispatch =>
        dispatch(setPath(path))

/**
 * REDUCER
 */
export default function (state = defaultPath, action) {
  switch (action.type) {
    case SET_PATH:
      return action.path
    default:
      return state
  }
}