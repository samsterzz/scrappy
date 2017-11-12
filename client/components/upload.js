import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDraftThunk, publishThunk, getProjectsThunk} from '../store'

/**
 * COMPONENT
 */
export class Upload extends Component {

    constructor(props) {
        super(props)
        console.log('THE PROPS IN CONSTRUCTOR', props)
        this.state = {
            projectId: null,
            subject: '',
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

        console.log('the state', this.state)
    }

    handleImageChange(event) {
        this.setState({image: event.target.files[0]})
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.createNote(this.state)

        this.setState({subject: '', text: '', image: '', isPublished: false});
    }

    render() {
        console.log('THE PROPS IN RENDER', this.props)

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
                <p>Subject: <input
                    type="text"
                    name="subject"
                    value={this.state.subject}
                    onChange = {this.handleChange} 
                /></p>
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