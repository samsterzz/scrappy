import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PROJECT = 'GET_SINGLE_PROJECTS'

/**
 * INITIAL STATE
 */
const defaultProject = {}

/**
 * ACTION CREATORS
 */
const getSingleProject = project => ({type: GET_SINGLE_PROJECT, project})

/**
 * THUNK CREATORS
 */
export const getSingleProjectThunk = (projectName) =>
  dispatch =>
    axios.get(`/api/projects/single/${projectName}`)
      .then(res => {
        dispatch(getSingleProject(res.data)) })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultProject, action) {
  switch (action.type) {
    case GET_SINGLE_PROJECT:
      return action.project
    default:
      return state
  }
}