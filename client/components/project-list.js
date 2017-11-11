import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {getAllProjectsThunk} from '../store'

/**
 * COMPONENT
 */
export class ProjectList extends Component {

    componentDidMount() {
        this.props.fetchAllProjects(this.props.userId);
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
    fetchAllProjects(userId) {
      dispatch(getAllProjectsThunk(userId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ProjectList))