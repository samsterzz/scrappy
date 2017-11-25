import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const SettingsHome = (props) => {
  const {email, firstName} = props

  return (
    <div>
        <br />Hello, {
          firstName ? firstName : email
        }!
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(SettingsHome)