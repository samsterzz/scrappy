import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_PROJECT = 'SET_PROJECT'

/**
 * INITIAL STATE
 */
const defaultProject = {}

/**
 * ACTION CREATORS
 */
const setProject = project => ({type: SET_PROJECT, project})

/**
 * THUNK CREATORS
 */
export const setProjectThunk = (projectName) =>
  dispatch =>
    axios.get(`/api/projects/name/${projectName}`)
      .then(res => {
        dispatch(setProject(res.data)) })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultProject, action) {
  switch (action.type) {
    case SET_PROJECT:
      return action.project
    default:
      return state
  }
}