import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_PROJECTS = 'GET_ALL_PROJECTS'

/**
 * INITIAL STATE
 */
const defaultProjects = []

/**
 * ACTION CREATORS
 */
const getAllProjects = projects => ({type: GET_ALL_PROJECTS, projects})

/**
 * THUNK CREATORS
 */
export const getAllProjectsThunk = (userId) =>
  dispatch =>
    axios.get(`/api/projects/${userId}`)
      .then(res =>
        dispatch(getAllProjects(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultProjects, action) {
  switch (action.type) {
    case GET_ALL_PROJECTS:
      return action.projects
    default:
      return state
  }
}