import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {getSingleProjectThunk} from '../store'

/**
 * COMPONENT
 */
export class ProjectView extends Component {

    componentDidMount() {
        this.props.fetchSingleProject(this.props.match.params.project);
    }

    componentWillReceiveProps(nextProps) {
        console.log('next props are', nextProps.match.params.project)
        if (this.props.match.params.project != nextProps.match.params.project) {
            this.props.fetchSingleProject(nextProps.match.params.project);
        }
    }

    render() {
        console.log('PROJECT VIEW PROPS', this.props)
        return (
            <div>
                {
                    this.props.projectNotes.map(note => {
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
        projectNotes: state.projectNotes.reverse()
    }
}

const mapDispatch = (dispatch) => {
  return {
    fetchSingleProject(project) {
      dispatch(getSingleProjectThunk(project))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ProjectView))