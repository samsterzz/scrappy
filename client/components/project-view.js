import React, {Component} from 'react'
import {withRouter} from 'react-router';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'
import {getSingleProjectThunk} from '../store'

/**
 * COMPONENT
 */
export class ProjectView extends Component {

    componentDidMount() {
        this.props.fetchUserProject(this.props.match.params.project);
    }

    render() {
        console.log('PROJECT VIEW PROPS', this.props)
        return (
            <div>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        project: state.project
    }
}

const mapDispatch = (dispatch) => {
  return {
    fetchUserProject(projectName) {
        console.log('PROJECT NAME', projectName)
      dispatch(getSingleProjectThunk(projectName))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(ProjectView))