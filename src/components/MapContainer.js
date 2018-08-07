/* global google */
import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'
import PropTypes from 'prop-types'


export class MapContainer extends Component {

   static propTypes = {
    onMarkerClicked: PropTypes.func.isRequired,
    onMapClicked: PropTypes.func.isRequired,
    showingInfoWindow:PropTypes.bool.isRequired,
    closeingInfoWindow :PropTypes.func.isRequired,
    markers : PropTypes.array.isRequired,
    activeMarker:PropTypes.object.isRequired,
    error:PropTypes.bool,
    photo :PropTypes.string.isRequired,
    selectedPlace:PropTypes.string.isRequired,
    zoom: PropTypes.number,
    center: PropTypes.object
  }
  state={
    bounds:{}
  }
  componentDidMount(){
    this.setMapBounds()
  }

  // This function will loop through the markers array
  // and Extend the boundaries of the map for each marker and display the marker
  setMapBounds() {
    let bounds = new this.props.google.maps.LatLngBounds();
    for (let i = 0; i < this.props.markers.length; i++) {
      bounds.extend(this.props.markers[i].location);
    }
    this.setState({bounds});
  }

  choosePlace = (props, marker, e) => {
    this.props.onMarkerClicked(props, marker, e)
    // this.props.onUpdateMarkers()
  }

  clickTheMap = () => {
    this.props.onMapClicked()
  }

  createMarkerIcon(iconColor) {
    let markerImage = new this.props.google.maps.MarkerImage(
      'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ iconColor +'|40|_|%E2%80%A2',
      new this.props.google.maps.Size(21, 34),
      new this.props.google.maps.Point(0, 0),
      new this.props.google.maps.Point(10, 34),
      new this.props.google.maps.Size(21,34));
    return markerImage;
  }

  render(){
    const style = {
    width: '100%',
    height: '100%'
    }
    const defaultIcon = this.createMarkerIcon('225a8e');
    const highlightedIcon = this.createMarkerIcon('ad057c');
    const imageName= './img/' +this.props.photo;
    // const map = this.props.google.map;


    return(
          <section className="map" aria-label="Neighborhood google map">
            <Map google={this.props.google}
              zoom={this.props.zoom}
              style={style}
              role={'application'}
              aria-label={'Neighborhood google map'}
              initialCenter={this.props.center}
              onClick={this.clickTheMap}
             >
               {
                 this.props.markers.map((marker, index) => {
                   return(<Marker key={index}
                     position={ marker.location}
                     name={marker.title}
                     title={marker.title}
                     onClick={this.choosePlace}
                     animation={(this.props.selectedPlace === marker.title) && this.props.google.maps.Animation.BOUNCE}
                     icon={this.props.selectedPlace === marker.title ? highlightedIcon : defaultIcon}
                     // { url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|FFFF24|40|_|%E2%80%A2', scaledSize: new this.props.google.maps.Size(21, 34)}

                   />)
                 })
               }

               <InfoWindow
                 marker={this.props.activeMarker}
                 visible={this.props.showingInfoWindow}
                 onClose={this.props.closeingInfoWindow}>
                 <div>
                    <img  tabIndex='0' src= {this.props.error ? require(`${imageName}`) : this.props.photo} alt={this.props.activeMarker.name}/>
                   <h3 tabIndex='0'>{this.props.activeMarker.name}</h3>
                 </div>
              </InfoWindow>
             </Map>
           </section>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDqRj6EWf5JU1UO-nQME_tLjWL12uOmFyc'
})(MapContainer)
