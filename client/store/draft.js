import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_DRAFT = 'GET_DRAFT'

/**
 * INITIAL STATE
 */
const defaultDraft = {}

/**
 * ACTION CREATORS
 */
const getDraft = draft => ({type: GET_DRAFT, draft})

/**
 * THUNK CREATORS
 */
export const getDraftThunk = (userId) =>
  dispatch =>
    axios.get(`/api/notes/${userId}/draft`)
      .then(res =>
        dispatch(getDraft(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultDraft, action) {
  switch (action.type) {
    case GET_DRAFT:
      return action.draft
    default:
      return state
  }
}