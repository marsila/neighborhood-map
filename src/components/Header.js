import React, {Component} from 'react'
import PropTypes from 'prop-types'

function Header(props) {

  Header.propTypes = {
    onToggleSideBar: PropTypes.func.isRequired
  }
  let displaySideBar

  return(
    <header>
      <nav>
        <h1>My Neighborhood Map</h1>
        <button tabIndex= '0'
          role='button'
          aria-label='menu'
          aria-expanded="true"
          className="fa fa-bars icon"
          onClick={() =>{props.onToggleSideBar(displaySideBar)}}
        >
        </button>
      </nav>
    </header>
  )
}

export default Header;
