import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const SettingsGeneral = (props) => {

  return (
    <div>
        This is your general settings.
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

export default connect(mapState)(SettingsGeneral)