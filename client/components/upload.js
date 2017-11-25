import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProjectsThunk, createNoteThunk} from '../store'

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
            projectId: null,
            submitted: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchProjects(this.props.userId)

        if (this.props.previousPath) {

            let projectId
            this.props.projects.find(project => {
                if (project.name === this.props.previousPath) projectId = project.id
            })

            this.setState({projectId: projectId})
        }
    }

    handleChange(event) {

        if (!isNaN(event.target.value)) {
            this.setState({projectId: Number(event.target.value)})
            return
        }
        this.setState({[event.target.name]: event.target.value})
    }

    handleImageChange(event) {
        event.preventDefault()

        this.setState({image: event.target.files[0]})
    }

    handleSubmit(event) {
        event.preventDefault()

        if (!this.state.projectId) {
            alert("Oops! A note must have a project.")
            return
        }

        this.setState({submitted: true})

        let projectName
        if (this.state.projectId) {
            projectName = this.props.projects.find(project => 
                project.id === this.state.projectId
            ).name
        }
        
        this.props.publish({
            text: this.state.text,
            image: this.state.image,
            userId: this.state.userId,
            projectId: this.state.projectId
        }, projectName)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p><select onChange={this.handleChange} name="projectId">
                    <option value="">Select Project</option>  
                    {
                        this.props.projects.map(project => 
                            <option 
                                key={project.id} 
                                value={project.id}
                                selected={this.props.previousPath === project.name && "selected"}>
                                    {project.name}
                            </option>
                        )
                    }
                </select></p>
                <p>Text: 
                    <br /><textarea
                    type="text"
                    name="text"
                    value={this.state.text}
                    onChange = {this.handleChange}
                    className="add-note-text"
                /></p>
                <p>Image: <input 
                    type="file"
                    onChange = {this.handleImageChange}
                /></p>
                <div className="submit">
                    {
                        !this.state.submitted ?
                        <button 
                            type="submit" 
                            disabled={this.state.submitted ? "disabled" : ""}>
                            Submit
                        </button>
                        : <div className="loader"></div>
                    }
                </div>
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
        publish(draft, projectName) {
            dispatch(createNoteThunk(draft, projectName))
        }
    }
}

export default connect(mapState, mapDispatch)(Upload)