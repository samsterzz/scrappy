import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editProjectThunk} from '../store'

/**
 * COMPONENT
 */
export class Project extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: props.name,
            showEdit: false
        }

        this.toggleVisible = this.toggleVisible.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleVisible() {
        this.setState({showEdit: !this.state.showEdit})
    }

    handleChange(event) {
        this.setState({name: event.target.value})

        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.editProject(this.props.projectId, {name: this.state.name})

        this.toggleVisible()
    }

    render() {
        return (
            <div className="project">
                {
                    !this.state.showEdit ? 
                    <span>
                        {this.state.name}
                        <button onClick={this.toggleVisible} className="project-button">Rename</button>
                    </span>
                    : <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="edit-project-name"
                        />
                        <button type="submit" className="project-button">Submit</button>
                    </form>
                }
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {}
}

const mapDispatch = (dispatch) => {
  return {
    editProject(projectId, project) {
        dispatch(editProjectThunk(projectId, project))
    }
  }
}

export default connect(mapState, mapDispatch)(Project)