import React, {Component} from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AllView = props => {

    return (
        <div>
            {
                props.notes.map(note => {
                    return <p key={note.id}>
                        {note.subject}
                        <br />{note.text}
                    </p>
                })
            }
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        userId: state.user.id,
        notes: state.user.notes.reverse() // to put the notes in reverse chronological order
    }
}

export default connect(mapState)(AllView)