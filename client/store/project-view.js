import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PROJECT_NOTES = 'GET_SINGLE_PROJECTS'
const REMOVE_NOTE = 'REMOVE_NOTE'

/**
 * INITIAL STATE
 */
const defaultProject = []

/**
 * ACTION CREATORS
 */
const getProjectNotes = notes => ({type: GET_PROJECT_NOTES, notes})
const removeNote = noteId => ({type: REMOVE_NOTE, noteId})

/**
 * THUNK CREATORS
 */
export const getProjectNotesThunk = (projectName) =>
  dispatch =>
    axios.get(`/api/projects/${projectName}`)
      .then(res => {
        dispatch(getProjectNotes(res.data)) })
      .catch(err => console.log(err))

export const removeNoteFromProjectThunk = (noteId) =>
  dispatch => {
    dispatch(removeNote(noteId))
    axios.delete(`/api/notes/remove/${noteId}`)
      .catch(err => console.log(err))
  }

/**
 * REDUCER
 */
export default function (state = defaultProject, action) {
  switch (action.type) {
    case GET_PROJECT_NOTES:
      return action.notes
    case REMOVE_NOTE:
      return state.filter(note => note.id !== action.noteId)
    default:
      return state
  }
}