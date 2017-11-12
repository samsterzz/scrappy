import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getNotesThunk, removeNoteThunk} from '../store'

/**
 * COMPONENT
 */
export class AllView extends Component {

    constructor() {
        super()

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchNotes(this.props.userId)
    }

    handleClick(event) {
        this.props.removeNote(Number(event.target.value))
    }

    render() {
        return (
            <div>
                {
                    this.props.notes.map(note => {
                        return <p key={note.id}>
                            <button value={note.id} onClick={this.handleClick}>x</button>  
                            <br />{note.text}
                        </p>
                    })
                }
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        userId: state.user.id,
        notes: state.notes.reverse() // to put the notes in reverse chronological order
    }
}

const mapDispatch = (dispatch) => {
  return {
    fetchNotes(userId) {
      dispatch(getNotesThunk(userId))
    },
    removeNote(noteId) {
        dispatch(removeNoteThunk(noteId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllView)