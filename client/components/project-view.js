import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import {getProjectNotesThunk, setPathThunk} from '../store'
import {Note} from './'

/**
 * COMPONENT
 */
export class ProjectView extends Component {

    constructor(props) {
        super(props)

        props.setPath(props.match.params.project)
    }

    componentDidMount() {
        this.props.fetchProjectNotes(this.props.match.params.project);
    }

    componentWillReceiveProps(nextProps) {
        this.props.setPath(nextProps.match.params.project)

        if (this.props.match.params.project != nextProps.match.params.project) {
            this.props.fetchProjectNotes(nextProps.match.params.project)
        }
    }

    render() {
        return (
            <div className="notes-list">
                {
                    this.props.projectNotes.length > 0 ? this.props.projectNotes.map(note => 
                        <Note
                            key={note.id} 
                            image={note.image} 
                            text={note.text} 
                            noteId={note.id} 
                        />
                    )
                    : <div className="no-notes">
                        <span>There are no notes for this project. Upload one!</span>
                        <img src="/arrow.png" height="35" width="35" className="arrow" />
                    </div>
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
    setPath(path) {
        dispatch(setPathThunk(path))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ProjectView))