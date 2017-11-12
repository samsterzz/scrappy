import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SINGLE_PROJECT = 'GET_SINGLE_PROJECTS'

/**
 * INITIAL STATE
 */
const defaultProject = []

/**
 * ACTION CREATORS
 */
const getSingleProject = notes => ({type: GET_SINGLE_PROJECT, notes})

/**
 * THUNK CREATORS
 */
export const getSingleProjectThunk = (project) =>
  dispatch =>
    axios.get(`/api/projects/${project}`)
      .then(res => {
        dispatch(getSingleProject(res.data)) })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultProject, action) {
  switch (action.type) {
    case GET_SINGLE_PROJECT:
      return action.notes
    default:
      return state
  }
}