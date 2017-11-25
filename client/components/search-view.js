import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import {searchNotesThunk} from '../store'
import {Note} from './'

/**
 * COMPONENT
 */
export class SearchView extends Component {

    componentDidMount() {
        this.props.searchNotes(this.props.match.params.terms)
    }

    componentWillReceiveProps(nextProps) {

        if (this.props.match.params.terms != nextProps.match.params.terms) {
            this.props.searchNotes(nextProps.match.params.terms)
        }
    }

    render() {
        return (
            <div className="notes-list">
                {
                    this.props.searchedNotes.map(note => 
                        <Note
                            key={note.id} 
                            image={note.image} 
                            text={note.text} 
                            noteId={note.id} 
                        />
                    )
                }

            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        searchedNotes: state.searchedNotes.reverse()
    }
}

const mapDispatch = (dispatch) => {
  return {
    searchNotes(terms) {
        dispatch(searchNotesThunk(terms))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(SearchView))