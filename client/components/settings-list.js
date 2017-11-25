import React from 'react'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const SettingsList = props => {
    return (
        <ul>
            <li><NavLink to="/settings/projects">Your Projects</NavLink></li>
        </ul>
    )
    
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
    }
}

const mapDispatch = (dispatch) => {
  return {
  }
}

export default withRouter(connect(mapState, mapDispatch)(SettingsList))