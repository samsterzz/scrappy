import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const SettingsAccount = (props) => {

  return (
    <div>
        This is your account settings.
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
  }
}

export default connect(mapState)(SettingsAccount)