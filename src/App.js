import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import MapContainer from './MapContainer'
import SideBar from './SideBar'
import * as FoursquareAPI from './FoursquareAPI'
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

  state = {
    showingPlaces:markers,
    zoom: 12,
    center: {lat: 52.404221, lng: 16.933459 },
    showingInfoWindow: false,
    activeMarker: {},
    // selectedPlace: {},
    photo:'',
    // hoveredMarker:{},
    // selectedMarkerIndex : -1,
    icon:{}
  }

  markerClicked = (props, marker, e) => {

    var keyNames = Object.keys(props.position);
console.log(keyNames);
console.log(`marker = ${Object.keys(marker.position)}`);
    // console.log(`marker clicked :: props= ${props.name}, marker= ${marker.name} , e= ${e}`);

    this.setState({
      // selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      // zoom: 14,
      photo:'loading..'
    })
    this.setActiveMArkerDetails(props)
    this.updateMarkers(marker.name)
  }

  setActiveMArkerDetails = (marker) => {
    FoursquareAPI.getActiveMarkerId(marker.position.lat, marker.position.lng)
    .then(markerId => this.getDetails(markerId))
    .catch(e => this.handleEerror(e))
  }

  getDetails =(placeId)=> {
    FoursquareAPI.getMarkerDetails(placeId)
    .then((res)=> {
      if(res){
        // console.log(`res= ${Object.keys(res.response.venue)}` );
        if('bestPhoto' in res.response.venue){
          console.log(`ther is a photo`);
          var imgSrc = res.response.venue.bestPhoto.prefix + '150x150' +  res.response.venue.bestPhoto.suffix
          this.setState({photo : imgSrc})
        }else {
          console.log(`no photo`);
          this.setState({photo: 'not found!'})
        }
      }else {
        console.log(`no result!!!!`);
        this.setState({photo: 'error loading..'})
      }

    })
  }

  handleEerror =(e) => {
    this.setState({photo: 'error loading the img'})
  }

  mapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        zoom: 12
      })
    }
  }

  updateMarkers = (query)=> {
    console.log('update the markers inside the app');
    console.log(`the query = ${query}`);
    let showingPlaces

    //Update the view list markers according to the search
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingPlaces = markers.filter((marker)=> match.test(marker.title))
    } else{
      showingPlaces = markers
    }
    this.setState({showingPlaces})

  }

  changeMapZoom =() => (this.setState({zoom : 12}))

  choosePlace = (marker) =>{
    let showingPlaces
    showingPlaces = markers.filter((m) => marker.title === m.title)
    this.setState({ showingPlaces:showingPlaces})
  }
  closeingInfoWindow =()=> {
    this.setState({
      showingPlaces:markers,
      showingInfoWindow:false,
      activeMarker:{},
      photo:''

    })
  }

  render() {
    return (
      <div className="App">
        <header><nav><h1>My Neighborhood Map</h1></nav></header>
        <main className="main-content">
          <SideBar
            markers={this.state.showingPlaces}
            onchangeZoom={this.changeMapZoom}
            onUpdateMarkers={(query) => {
              this.updateMarkers(query)
            }}
            onMarkerClicked={(marker) => {
              this.choosePlace(marker)
            }}
          />

          <MapContainer
            markers={this.state.showingPlaces}
            onUpdateMarkers={(query) => {
              this.updateMarkers(query)
            }}
            onMarkerClicked={this.markerClicked}
            onMapClicked={this.mapClicked}
            setActiveMArkerDetails={this.setActiveMArkerDetails}
            closeingInfoWindow ={this.closeingInfoWindow}
            {...this.state}
          />
        </main>
        <footer>copy rights</footer>
      </div>
    );
  }
}

export default NeighborhoodApp;
