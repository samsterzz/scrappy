import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ALL_NOTES = 'GET_ALL_NOTES'

/**
 * INITIAL STATE
 */
const defaultNotes = []

/**
 * ACTION CREATORS
 */
const getAllNotes = notes => ({type: GET_ALL_NOTES, notes})

/**
 * THUNK CREATORS
 */
export const getAllNotesThunk = (userId) =>
  dispatch =>
    axios.get(`/api/notes/${userId}`)
      .then(res =>
        dispatch(getAllNotes(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultNotes, action) {
  switch (action.type) {
    case GET_ALL_NOTES:
      return action.notes
    default:
      return state
  }
}