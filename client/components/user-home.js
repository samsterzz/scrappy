import React from 'react'
import {connect} from 'react-redux'
import {AllView, ProjectView} from './'

export const UserHome = (props) => {
  
  console.log('HOME PROPS', props)
  return (
    <div>
      {
        props.location.pathname === '/home' ? <AllView /> : <ProjectView />
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log('STATE', state)
  return {
  }
}

export default connect(mapState)(UserHome)