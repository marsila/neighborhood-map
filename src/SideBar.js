import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

class SideBar extends Component {
  state = {
    query:''
  }

  updateQuery = (query) => {
    this.setState({query})
    this.props.onUpdateMarkers(query)
    this.props.onchangeZoom()
  }

  choosePlace = (marker) => {
    console.log(`marker name= ${marker.title}`);
    this.props.onMarkerClicked(marker)
  //  this.props.onUpdateMarkers()
  }



  render(){

    const {markers} = this.props
    const {query} = this.state
    markers.sort(sortBy('title'))

    return(
      <section className="side-bar">
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
                  onClick={() => {this.choosePlace(marker)}}>
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
