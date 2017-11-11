import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDraftThunk, publishThunk} from '../store'

/**
 * COMPONENT
 */
export class Upload extends Component {

    constructor(props) {
        super(props)
        console.log('THE PROPS IN STATE', props)
        this.state = {
            subject: '',
            text: '',
            imagePath: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchDraft(this.props.userId)
        // .then(() => {
        //     this.setState({
        //         subject: this.props.draft.subject, 
        //         text: this.props.draft.text, 
        //         imagePath: this.props.draft.imagePath});
        // })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.createNote(this.state)
        this.setState({subject: '', text: '', imagePath: null});
    }

    render() {
        console.log('THE PROPS IN RENDER', this.props)
        return (
            <form onSubmit={this.handleSubmit}>
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
                    type="text"
                    name="imagePath"
                    value={this.state.imagePath}
                    onChange = {this.handleChange} 
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
        draft: state.draft
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchDraft(userId) {
            dispatch(getDraftThunk(userId))
        },
        createNote() {
            dispatch(publishThunk())
        }
    }
}

export default connect(mapState, mapDispatch)(Upload)