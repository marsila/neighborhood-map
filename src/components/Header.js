import React, {Component} from 'react'
import PropTypes from 'prop-types'

function Header(props) {

  Header.propTypes = {
    onToggleSideBar: PropTypes.func.isRequired
  }
  let displaySideBar

  return(
    <header>
      <nav tabIndex= '-13'>
        <h1>My Neighborhood Map</h1>
        <i className="fa fa-bars icon"
        onClick={() =>{props.onToggleSideBar(displaySideBar)}}
        >
        </i>
      </nav>
    </header>
  )
}

export default Header;
