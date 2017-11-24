import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {getProjectsThunk, addProjectThunk} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
export class ProjectList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            userId: props.userId
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchProjects(this.props.userId);
    }

    handleChange(event) {
        this.setState({name: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.createProject(this.state, this.props.userId)

        history.push(`/projects/${this.state.name}`)

        this.setState({name: ''})
    }

    render() {
        return (
            <ul>
                {
                    this.props.projects.map(project => {
                        return <li key={project.id}>
                             <NavLink to={`/projects/${project.name}`}>{project.name}</NavLink> 
                        </li>
                    })
                }
                <li><form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.name}
                        onChange = {this.handleChange} 
                        className="new-project-input"
                    />
                    <button type="submit">+</button>
                </form></li>
            </ul>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        userId: state.user.id,
        projects: state.projects
    }
}

const mapDispatch = (dispatch) => {
  return {
    fetchProjects(userId) {
      dispatch(getProjectsThunk(userId))
    },
    createProject(project, userId) {
        dispatch(addProjectThunk(project))
        dispatch(getProjectsThunk(userId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ProjectList))