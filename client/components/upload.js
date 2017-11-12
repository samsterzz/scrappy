import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDraftThunk, publishThunk, getProjectsThunk} from '../store'
import history from '../history'

/**
 * COMPONENT
 */
export class Upload extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projectId: null,
            text: '',
            image: '',
            isPublished: false,
            userId: props.userId
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.props.fetchDraft(this.props.userId)
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
        this.setState({image: event.target.files[0]})
    }

    handleSubmit(event) {
        event.preventDefault()
        
        this.props.createNote(this.state)
        this.setState({text: '', image: '', isPublished: false});

        let projectName = this.props.projects.find(project => 
            project.id === this.state.projectId
        ).name
        history.push(`/projects/${projectName}`)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p><select onChange={this.handleChange}>
                    <option value="">Select Project</option>  
                    {
                        this.props.projects.map(project => 
                            <option key={project.id} value={project.id}>{project.name}</option>
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
        draft: state.draft,
        projects: state.projects
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchDraft(userId) {
            dispatch(getDraftThunk(userId))
        },
        fetchProjects(userId) {
            dispatch(getProjectsThunk(userId))
        },
        createNote(draft) {
            dispatch(publishThunk(draft))
        }
    }
}

export default connect(mapState, mapDispatch)(Upload)