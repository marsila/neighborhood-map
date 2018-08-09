import React, {Component} from 'react'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

class SideBar extends Component {
  state = {
    query:'',
    selectedPlace:''
  }
  static propTypes = {
    onUpdateMarkers: PropTypes.func.isRequired,
    onChoosePlace: PropTypes.func.isRequired,
    markers : PropTypes.array.isRequired,
    displaySideBar :PropTypes.string.isRequired
  }

  updateQuery = (query) => {
    this.setState({query})
    this.props.onUpdateMarkers(query)
  }

  onChoosePlace = (markerTitle) => {
    this.setState({selectedPlace: markerTitle})
    this.props.onChoosePlace(markerTitle)
  }

  render(){

    const {markers} = this.props
    const {query} = this.state

    markers.sort(sortBy('title'))

    return(
      <section className={this.props.displaySideBar}>
        <div className="search-places">
          <input
            type="text"
            aria-label="Search by place name"
            placeholder="Search by place name"
            value={query}
            onChange={(e)=> this.updateQuery(e.target.value)}
          />

        </div>
        <div className="view-list-markers">
          <ul>
            {
              this.props.markers.map((marker, index) => (
              <li key={index} tabIndex ='0'>
                <a className="marker-name"
                  aria-label={marker.title}
                  onClick={() => {
                    this.onChoosePlace(marker.title)
                  }}
                >
                   {marker.title}
                </a>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}
}

export default SideBar;
