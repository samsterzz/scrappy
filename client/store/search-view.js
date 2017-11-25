import axios from 'axios'

/**
 * ACTION TYPES
 */
const SEARCH_NOTES = 'SEARCH_NOTES'

/**
 * INITIAL STATE
 */
const defaultNotes = []

/**
 * ACTION CREATORS
 */
const searchNotes = notes => ({type: SEARCH_NOTES, notes})

/**
 * THUNK CREATORS
 */
export const searchNotesThunk = (terms) => 
  dispatch =>
    axios.get(`/api/notes/search/${terms}`)
      .then(res =>
        dispatch(searchNotes(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultNotes, action) {
  switch (action.type) {
    case SEARCH_NOTES:
      return action.notes
    default:
      return state
  }
}