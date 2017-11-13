import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProjectsThunk, createNoteThunk} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
export class Upload extends Component {

    constructor(props) {
        super(props)

        this.state = {
            text: '',
            image: '',
            userId: props.userId,
            projectId: null
        }
        console.log('THE PROPS IN STATE', props)
        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchProjects(this.props.userId)
    }

    handleChange(event) {
        if (!isNaN(event.target.value)) {
            this.setState({projectId: Number(event.target.value)})
            return
        }
        this.setState({[event.target.name]: event.target.value})

        console.log('STATE', this.state)
    }

    handleImageChange(event) {
        event.preventDefault()

        this.setState({image: event.target.files[0]})
    }

    handleSubmit(event) {
        event.preventDefault()

        if (!this.state.projectId) {
            alert("Oops! Please select a project.")
            return false
        }

        this.props.publish(this.state)

        if (this.state.projectId) {
            let projectName = this.props.projects.find(project => 
                project.id === this.state.projectId
            ).name
            history.push(`/projects/${projectName}`)
        } else {
            history.push(`/projects`)
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p><select onChange={this.handleChange}>
                    <option value="">Select Project</option>  
                    {
                        this.props.projects.map(project => 
                            <option 
                                key={project.id} 
                                value={project.id} 
                                selected={this.props.previousPath === project.name}>
                                    {project.name}
                            </option>
                        )
                    }
                </select></p>
                <p>Text: <input
                    type="text"
                    name="text"
                    value={this.state.text}
                    onChange = {this.handleChange} 
                /></p>
                <p>Image: <input 
                    type="file"
                    onChange = {this.handleImageChange}
                /></p>
                <p><button type="submit">Submit</button></p>
            </form>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        userId: state.user.id,
        projects: state.projects,
        previousPath: state.previousPath
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchProjects(userId) {
            dispatch(getProjectsThunk(userId))
        },
        publish(draft) {
            dispatch(createNoteThunk(draft))
        }
    }
}

export default connect(mapState, mapDispatch)(Upload)