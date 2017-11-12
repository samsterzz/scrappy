import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_NOTES = 'GET_NOTES'

/**
 * INITIAL STATE
 */
const defaultNotes = []

/**
 * ACTION CREATORS
 */
const getNotes = notes => ({type: GET_NOTES, notes})

/**
 * THUNK CREATORS
 */
export const getNotesThunk = (userId) =>
  dispatch =>
    axios.get(`/api/notes/${userId}`)
      .then(res =>
        dispatch(getNotes(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.notes
    default:
      return state
  }
}