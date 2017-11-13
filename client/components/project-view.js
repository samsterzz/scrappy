import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {getProjectNotesThunk, removeNoteFromProjectThunk} from '../store'

/**
 * COMPONENT
 */
export class ProjectView extends Component {

    constructor() {
        super()

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.props.fetchProjectNotes(this.props.match.params.project);
    }

    componentWillReceiveProps(nextProps) {
        console.log('next props are', nextProps.match.params.project)
        if (this.props.match.params.project != nextProps.match.params.project) {
            this.props.fetchProjectNotes(nextProps.match.params.project);
        }
    }

    handleClick(event) {
        this.props.removeNote(Number(event.target.value))
    }

    render() {
        return (
            <div>
                {
                    this.props.projectNotes.map(note => {
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
        projectNotes: state.projectNotes.reverse()
    }
}

const mapDispatch = (dispatch) => {
  return {
    fetchProjectNotes(projectName) {
        dispatch(getProjectNotesThunk(projectName))
    },
    removeNote(noteId) {
        dispatch(removeNoteFromProjectThunk(noteId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ProjectView))