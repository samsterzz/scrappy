import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_NOTES = 'GET_NOTES'
const REMOVE_NOTE = 'REMOVE_NOTE'

/**
 * INITIAL STATE
 */
const defaultNotes = []

/**
 * ACTION CREATORS
 */
const getNotes = notes => ({type: GET_NOTES, notes})
const removeNote = noteId => ({type: REMOVE_NOTE, noteId})

/**
 * THUNK CREATORS
 */
export const getNotesThunk = (userId) => 
  dispatch =>
    axios.get(`/api/notes/${userId}`)
      .then(res =>
        dispatch(getNotes(res.data)))
      .catch(err => console.log(err))

export const publishThunk = (draft) => 
  dispatch => 
    axios.put(`/api/notes/add`, draft)
      .catch(err => console.log(err))

export const removeNoteThunk = (noteId) =>
  dispatch =>
    axios.delete(`/api/notes/remove/${noteId}`)
      .then(res =>
        dispatch(removeNote(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.notes
    case REMOVE_NOTE:
      return state.notes.filter(note => note.id !== action.noteId)
    default:
      return state
  }
}