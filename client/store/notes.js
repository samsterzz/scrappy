import axios from 'axios'
import history from '../history'

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

export const createNoteThunk = (draft, projectName) => 
  dispatch => {

    let formData = new FormData();
        formData.append('projectId', draft.projectId)
        formData.append('userId', draft.userId)
        formData.append('text', draft.text)
        formData.append('image', draft.image);

    var config = {
        headers: { 'Content-Type': 'multipart/form-data' }
    }
      
    axios.post(`/api/notes/add`, formData, config)
      .then(() => {
        history.push(`/projects/${projectName}`)
      })
      .catch(err => console.log(err))
  }

export const editNoteThunk = (noteId, note) => 
  dispatch => {
    axios.put(`/api/notes/edit/${noteId}`, note)
        .catch(err => console.log(err))
  }

export const removeNoteThunk = (noteId) =>
  dispatch => {
    dispatch(removeNote(noteId))
    axios.delete(`/api/notes/remove/${noteId}`)
      .catch(err => console.log(err))
  }

/**
 * REDUCER
 */
export default function (state = defaultNotes, action) {
  switch (action.type) {
    case GET_NOTES:
      return action.notes
    case REMOVE_NOTE:
      return state.filter(note => note.id !== action.noteId)
    default:
      return state
  }
}