import React, { Component } from 'react';
// import GoogleMapReact from 'google-maps-react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react';

import './App.css';


export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMouseoverMarker(props, marker, e) {
  // ..
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };
  render(){
    let {google}= this.props
    const style = {
    width: '100%',
    height: '100%'
    }
    const pos={
      lat:52.400498,
      lng:16.994479
    }
    return(
      <div>
        <header><nav><h1>My Neighborhood Map</h1></nav></header>
        <main className="main-content">
          <section className="side-bar">Side bar</section>
          <section className="map">
            <Map google={this.props.google}
              zoom={12}
              style={style}
              initialCenter={{
                lat: 52.404221,
                lng: 16.933459
              }}
             >
               <Marker
                 position={pos}
                 onClick={this.onMarkerClick}
                 title={'Nowe Zoo'}
                 name={'Nowe Zoo'}
               />
               <Marker
                 name={'cytadela Park'}
                 onClick={this.onMarkerClick}
                 position={{lat: 52.421674, lng: 16.936194}} />
               <Marker />
               <Marker
                 name={'Stary Rynek'}
                 position={{lat: 52.408128, lng: 16.934552}}
                 onClick={this.onMarkerClick}
                  />
               <InfoWindow
                 marker={this.state.activeMarker}
                 visible={this.state.showingInfoWindow}>
                 <div>
                   <h1>{this.state.selectedPlace.name}</h1>
                 </div>
              </InfoWindow>
             </Map>
           </section>
        </main>
        <footer>copy rights</footer>
    </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDqRj6EWf5JU1UO-nQME_tLjWL12uOmFyc'
})(MapContainer)
