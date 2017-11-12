import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getNotesThunk} from '../store'

/**
 * COMPONENT
 */
export class AllView extends Component {

    componentDidMount() {
        this.props.fetchNotes(this.props.userId);
    }

    render() {
        return (
            <div>
                {
                    this.props.notes.map(note => {
                        return <p key={note.id}>
                            {note.subject}
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
    }
  }
}

export default connect(mapState, mapDispatch)(AllView)