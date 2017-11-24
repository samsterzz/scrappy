import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getProjectsThunk, createNoteThunk, setProjectThunk} from '../store'
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

        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchProjects(this.props.userId)

        this.props.previousPath && this.props.setProject(this.props.previousPath)
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

        if (!this.state.projectId && !this.props.upload.id) {
            alert("Oops! Please select a project.")
            return false
        }

        this.props.publish({
            text: this.state.text || '',
            image: this.state.image || '',
            userId: this.props.userId,
            projectId: this.props.upload.id || this.state.projectId
        })

        if (this.state.projectId || this.props.upload.id) {
            let projectName = this.props.projects.find(project => 
                project.id === this.state.projectId || this.props.upload.id
            ).name
            history.push(`/projects/${projectName}`)
        } else {
            history.push(`/projects`)
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p><select 
                    onChange={this.handleChange} 
                    value={this.props.upload ? this.props.upload.id : "" }>
                    <option value="">Select Project</option>  
                    {
                        this.props.projects.map(project => 
                            <option 
                                key={project.id} 
                                value={project.id}>
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
    console.log('THE STATE', state)
    return {
        userId: state.user.id,
        projects: state.projects,
        previousPath: state.previousPath,
        upload: state.upload
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchProjects(userId) {
            dispatch(getProjectsThunk(userId))
        },
        publish(draft) {
            dispatch(createNoteThunk(draft))
        },
        setProject(projectName) {
            dispatch(setProjectThunk(projectName))
        }
    }
}

export default connect(mapState, mapDispatch)(Upload)