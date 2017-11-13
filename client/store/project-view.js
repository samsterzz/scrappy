import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PROJECT_NOTES = 'GET_PROJECT_NOTES'
const REMOVE_NOTE_FROM_PROJECT = 'REMOVE_NOTE_FROM_PROJECT'

/**
 * INITIAL STATE
 */
const defaultProject = []

/**
 * ACTION CREATORS
 */
const getProjectNotes = notes => ({type: GET_PROJECT_NOTES, notes})
const removeNoteFromProject = noteId => ({type: REMOVE_NOTE_FROM_PROJECT, noteId})

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
    dispatch(removeNoteFromProject(noteId))
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
    case REMOVE_NOTE_FROM_PROJECT:
      return state.filter(note => note.id !== action.noteId)
    default:
      return state
  }
}