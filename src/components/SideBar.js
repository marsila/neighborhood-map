import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
// import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'
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
    console.log(`marker name= ${markerTitle}`);
    this.setState({selectedPlace: markerTitle})
    this.props.onChoosePlace(markerTitle)
  }



  render(){

    const {markers} = this.props
    const {query} = this.state

    markers.sort(sortBy('title'))

    return(
      <section className={this.props.displaySideBar}>
        {console.log(`class name = ${this.props.displaySideBar}`)}
        <div className="search-places">
          <input
            type="text"
            placeholder="Search by place name"
            value={query}
            onChange={(e)=> this.updateQuery(e.target.value)}
          />

        </div>
        <div className="view-list-markers">
          <ul>
            {
              this.props.markers.map((marker, index) => (
              <li key={index}>
                <h3 className="marker-name"
                  onClick={() => {
                    // console.log(`markerSide= ${Object.keys(marker)}`);
                    this.onChoosePlace(marker.title)
                }}>
                   {marker.title}
                </h3>
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
