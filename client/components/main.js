import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'
import {ProjectList, SettingsList} from './'
import {CloudUploadIcon, GearIcon, SearchIcon} from 'react-octicons'
import history from '../history'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
export class Main extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      projects: props.location.pathname.includes('projects') && !props.location.pathname.includes('settings') ? true : false,
      settings: props.location.pathname.includes('settings') || props.location.pathname.includes('settings/projects') ? true : false,
      upload: props.location.pathname.includes('upload') ? true : false,
      search: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.location.pathname != nextProps.location.pathname) {
        this.setState({
          [this.props.location.pathname.split('/')[1]]: false,
          [nextProps.location.pathname.split('/')[1]]: true
        })
    }
  }

  handleChange(event) {
    this.setState({search: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.search) {
      history.push(`/projects/search/${this.state.search}`)
      this.setState({search: ''})
    }
  }

  render () {
    const {children, logOut, isLoggedIn} = this.props

    let component;
    if (this.props.location.pathname.includes('settings')) {
      component = <SettingsList />
    } else if (this.props.location.pathname.includes('projects') || this.props.location.pathname.includes('search')) {
      component = <ProjectList />
    }

    return (
      <div>
        <h1>scrappy</h1> 
        <nav>
          {
            isLoggedIn
              ? <div>
                {/* The navbar will show these links after you log in */}
                <div className="left-nav">
                  <Link to="/projects" 
                    className={this.state.projects ? "active" : ""}>home</Link>
                  <a href="#" onClick={logOut}>logout</a>
                  <form onSubmit={this.handleSubmit} className="search-form">
                    <input 
                      type="search" 
                      placeholder="Search" 
                      value={this.state.search}
                      onChange={this.handleChange} />
                    <button type="submit" className="search-button">
                      <SearchIcon width="15" height="15" className="search-icon" />
                    </button>
                  </form>
                </div>
                <div className="right-nav">
                  <NavLink to="/settings">
                    <GearIcon width="25" height="25" 
                      className={this.state.settings ? "active" : "icon"} />
                  </NavLink>
                  <NavLink to="/upload">
                    <CloudUploadIcon  width="25" height="25" 
                      className={this.state.upload ? "active" : "icon"} />
                  </NavLink>
                </div>
              </div>
              : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">login</Link>
                <Link to="/signup">sign up</Link>
              </div>
          }
        </nav>
        <hr />
        {isLoggedIn ? <div className="sidebar">{component}</div> : null}
        {children}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    logOut () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  logOut: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
