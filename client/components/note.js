import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import {editNoteThunk, removeNoteThunk, removeNoteFromProjectThunk} from '../store'

/**
 * COMPONENT
 */
export class Note extends Component {

    constructor(props) {
        super(props)

        this.state = {
            image: 'https://s3.us-east-2.amazonaws.com/scrappynotes/' + props.image,
            text: props.text,
            showEdit: false
        }

        this.toggleVisible = this.toggleVisible.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    toggleVisible() {
        this.setState({showEdit: !this.state.showEdit})
    }

    handleChange(event) {
        this.setState({text: event.target.value})

        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault()

        this.props.editNote(this.props.noteId, {text: this.state.text})

        this.toggleVisible()
    }

    handleClick(event) {

        let remove = confirm("Are you sure you want to delete this note?")

        if (remove) {
            this.props.match.params.project ? 
                this.props.removeNoteFromProject(Number(event.target.value)) 
                : this.props.removeNote(Number(event.target.value))
        }
    }

    render() {
        return (
            <div className="note">
                <div className="note-buttons">
                    <button onClick={this.toggleVisible}>Edit</button>
                    <button value={this.props.noteId} onClick={this.handleClick}>x</button>
                </div>
                {
                    this.props.image && <p><img className="note-image" src={this.state.image} /></p>
                }
                {
                    !this.state.showEdit ? <p>{this.state.text}</p> 
                    : <form onSubmit={this.handleSubmit}>
                        <textarea
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            className="note-edit"
                        />
                        <br /><button type="submit">Submit</button>
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
    editNote(noteId, note) {
        dispatch(editNoteThunk(noteId, note))
    },
    removeNote(noteId) {
        dispatch(removeNoteThunk(noteId))
    },
    removeNoteFromProject(noteId) {
        dispatch(removeNoteFromProjectThunk(noteId))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Note))