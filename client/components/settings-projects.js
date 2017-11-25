import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProjectsThunk, archiveThunk, unarchiveThunk} from '../store'
import {Project} from './'

/**
 * COMPONENT
 */
export class SettingsProjects extends Component {

  constructor() {
    super()

    this.state = {
      projectsToArchive: [],
      projectsToUnarchive: []
    }

    this.handleArchiveChange = this.handleArchiveChange.bind(this)
    this.handleArchiveSubmit = this.handleArchiveSubmit.bind(this)
    this.handleUnarchiveChange = this.handleUnarchiveChange.bind(this)
    this.handleUnarchiveSubmit = this.handleUnarchiveSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchProjects(this.props.userId)
  }

  handleArchiveChange(event) {
    let projectId = Number(event.target.value)
    let tempProjectsArr = this.state.projectsToArchive

    if (!tempProjectsArr.includes(projectId)) {
      tempProjectsArr.push(projectId)
    } else {
      let index = tempProjectsArr.indexOf(projectId)
      tempProjectsArr.splice(index, 1)
    }

    this.setState({projectsToArchive: tempProjectsArr})

    console.log('THE STATE', this.state)
  }

  handleArchiveSubmit(event) {
    event.preventDefault()

    this.props.archive(this.state.projectsToArchive, this.props.userId)

    this.setState({projectsToArchive: []})
  }

  handleUnarchiveChange(event) {
    let projectId = Number(event.target.value)
    let tempProjectsArr = this.state.projectsToUnarchive

    if (!tempProjectsArr.includes(projectId)) {
      tempProjectsArr.push(projectId)
    } else {
      let index = tempProjectsArr.indexOf(projectId)
      tempProjectsArr.splice(index, 1)
    }

    this.setState({projectsToUnarchive: tempProjectsArr})

    console.log('THE STATE', this.state)
  }

  handleUnarchiveSubmit(event) {
    event.preventDefault()

    this.props.unarchive(this.state.projectsToUnarchive, this.props.userId)

    this.setState({projectsToUnarchive: []})
  }

  render() {
    return (
      <div className="settings">
          <h4>Manage your projects here.</h4>
          <form onSubmit={this.handleArchiveSubmit}>
            {
              this.props.projects.map(project => {
                if (!project.isArchived) return <span key={project.id}>
                  <input 
                    type="checkbox"
                    value={project.id}
                    onChange={this.handleArchiveChange}
                    className="project-checkbox" 
                  />
                  <Project name={project.name} projectId={project.id} />
                  <br />
                </span>
              })
            }
            <button type="submit" className="archive-button">Archive</button>
          </form>
          <form onSubmit={this.handleUnarchiveSubmit}>
            {
              this.props.projects.map(project => {
                if (project.isArchived) return <span key={project.id}>
                  <input 
                    type="checkbox"
                    value={project.id}
                    onChange={this.handleUnarchiveChange}
                    className="project-checkbox" 
                  />
                  <Project name={project.name} projectId={project.id} />
                  <br />
                </span>
              })
            }
            <button type="submit" className="archive-button">Unarchive</button>
          </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('THE STATE', state)
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
    archive(projectIds, userId) {
      dispatch(archiveThunk(projectIds, userId))
    },
    unarchive(projectIds, userId) {
      dispatch(unarchiveThunk(projectIds, userId))
    }
  }
}

export default connect(mapState, mapDispatch)(SettingsProjects)