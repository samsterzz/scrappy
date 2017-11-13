import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {getProjectNotesThunk} from '../store'
import {Note} from './'

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
                    this.props.projectNotes.map(note => 
                        <Note key={note.id} text={note.text} noteId={note.id} />
                    )
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
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ProjectView))