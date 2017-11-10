import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllNotesThunk} from '../store'

/**
 * COMPONENT
 */
export class AllView extends Component {

    componentDidMount() {
        this.props.fetchUserNotes(this.props.userId);
    }

    render() {
        console.log('NOTES PROPS', this.props)
        return (
            <div>
                <h4>Notes</h4>
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
    fetchUserNotes(userId) {
      dispatch(getAllNotesThunk(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(AllView)