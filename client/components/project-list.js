import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {getProjectsThunk, addProjectThunk} from '../store'

/**
 * COMPONENT
 */
export class ProjectList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            userId: props.userId
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchProjects(this.props.userId);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})

        console.log('the state', this.state)
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.createProject(this.state)
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
                        name="name"
                        value={this.state.name}
                        onChange = {this.handleChange} 
                    />
                    <br /><input
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange = {this.handleChange} 
                    />
                    <button type="submit">Submit</button>
                </form></li>
            </ul>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    console.log(state)
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
    createProject(project) {
        dispatch(addProjectThunk(project))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ProjectList))