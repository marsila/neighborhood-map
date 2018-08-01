import React, { Component } from 'react'
import MapContainer from './MapContainer'
import SideBar from './SideBar'

import './App.css';

const markers = [
  {title: 'Nowe Zoo', location: {lat:52.400498, lng:16.994479}},
  {title: 'Cytadela Park', location: {lat: 52.421674, lng: 16.936194}},
  {title: 'Stary Rynek', location: {lat: 52.408128, lng: 16.934552}},
  {title: 'Politechnika Poznanska', location: {lat: 52.402358, lng: 16.950576}},
  {title: 'Posnania Mall', location: {lat: 52.39654, lng: 16.955338}},
  {title: 'Termy Maltańskie', location: {lat: 52.404827, lng: 16.973962}}
]

class NeighborhoodApp extends Component {

  updateMarkers = () => {
    console.log('update the markers inside the app');

  }

  render() {
    return (
      <div className="App">
        <header><nav><h1>My Neighborhood Map</h1></nav></header>
        <main className="main-content">
          <SideBar
            markers={markers}
            onUpdateMarkers={this.updateMarkers}
          />
          <MapContainer
            markers={markers}
            onUpdateMarkers={this.updateMarkers}
          />
        </main>
        <footer>copy rights</footer>
      </div>
    );
  }
}

export default NeighborhoodApp;
