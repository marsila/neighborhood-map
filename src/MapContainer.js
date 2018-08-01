/* global google */
import React, { Component } from 'react';
// import GoogleMapReact from 'google-maps-react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

const Map_Center = {lat: 52.404221, lng: 16.933459 }


export class MapContainer extends Component {

  state = {
    zoom: 12,
    initialCenter:Map_Center,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    hoveredMarker:{},
    icon:{}
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      zoom: 14
    })
    this.props.onUpdateMarkers()
  }


  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        zoom: 12
      })
    }
  }

  render(){
    const style = {
    width: '100%',
    height: '100%'
    }
    const hoveredIcon = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 8.5,
        fillColor: "blue",
        fillOpacity: 0.4,
        strokeWeight: 0.8
      }

    return(
          <section className="map">
            <Map google={this.props.google}
              zoom={this.state.zoom}
              style={style}
              initialCenter={this.state.initialCenter}
              onClick={this.onMapClicked}
             >
               {
                 this.props.markers.map((marker, index) => {
                   return(<Marker key={index}
                     position={ marker.location}
                     name={marker.title}
                     onClick={this.onMarkerClick}
                   />)
                 })
               }

               <InfoWindow
                 marker={this.state.activeMarker}
                 visible={this.state.showingInfoWindow}>
                 <div>
                   <h1>{this.state.selectedPlace.name}</h1>
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
