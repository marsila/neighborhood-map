/* global google */
import React, { Component } from 'react';
// import GoogleMapReact from 'google-maps-react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';





export class MapContainer extends Component {

  choosePlace = (props, marker, e) => {
    this.props.onMarkerClicked(props, marker, e)
    // this.props.onUpdateMarkers()
  }


  clickTheMap = () => {
    this.props.onMapClicked()
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
              zoom={this.props.zoom}
              style={style}
              initialCenter={this.props.center}
              onClick={this.clickTheMap}
             >
               {
                 this.props.markers.map((marker, index) => {
                   return(<Marker key={index}
                     position={ marker.location}
                     name={marker.title}
                     onClick={this.choosePlace}
                     // animation={this.props.activeMarker.name === marker.title ? this.props.google.maps.Animation.BOUNCE : null  }
                   />)
                 })
               }

               <InfoWindow
                 marker={this.props.activeMarker}
                 visible={this.props.showingInfoWindow}
                 onClose={this.props.closeingInfoWindow}>
                 <div>
                   <img src={this.props.photo} alt={this.props.activeMarker.name}/>
                   <h3>{this.props.activeMarker.name}</h3>
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
