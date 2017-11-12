import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PROJECTS = 'GET_PROJECTS'
const ADD_PROJECT = 'ADD_PROJECT'

/**
 * INITIAL STATE
 */
const defaultProjects = []

/**
 * ACTION CREATORS
 */
const getProjects = projects => ({type: GET_PROJECTS, projects})

/**
 * THUNK CREATORS
 */
export const getProjectsThunk = (userId) =>
  dispatch =>
    axios.get(`/api/users/${userId}`)
      .then(res =>
        dispatch(getProjects(res.data)))
      .catch(err => console.log(err))

export const addProjectThunk = (project) =>
  dispatch =>
    axios.post(`/api/projects/add`, project)
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultProjects, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return action.projects.reverse()
    default:
      return state
  }
}