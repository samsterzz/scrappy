import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {getAllProjectsThunk} from '../store'

/**
 * COMPONENT
 */
export class Projects extends Component {

    componentDidMount() {
        this.props.fetchUserProjects(this.props.userId);
    }

    render() {
        console.log('PROJECTS PROPS', this.props)
        return (
            <ul>
                {
                    this.props.projects.map(project => {
                        return <li key={project.id}>
                             <NavLink to={`/home/${project.name}`}>{project.name}</NavLink> 
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
        projects: state.projects.reverse() // to put the projects in reverse chronological order
    }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUserProjects(userId) {
      dispatch(getAllProjectsThunk(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Projects)