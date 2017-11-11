import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllNotesThunk} from '../store'

/**
 * COMPONENT
 */
export class AllView extends Component {

    componentDidMount() {
        this.props.fetchAllNotes(this.props.userId);
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
    fetchAllNotes(userId) {
      dispatch(getAllNotesThunk(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllView)