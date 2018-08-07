/* global google */
import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
// import MetaTags from 'react-meta-tags'
import MapContainer from './components/MapContainer'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Footer from './components/Footer'
import * as FoursquareAPI from './FoursquareAPI'

// import local photos that was tooken from wikibedia
// to use them when there is an error loading photos from third-party API

import photo_StaryRynek from './img/photo_Stary Rynek.jpg'
import photo_CytadelaPark from './img/photo_Cytadela Park.jpg'
import photo_PolitechnikaPoznanska from './img/photo_Politechnika Poznanska.jpg'
import photo_PosnaniaMall from './img/photo_Posnania Mall.jpg'
import photo_TermyMaltańskie from './img/photo_Termy Maltańskie.jpg'
import photo_NoweZoo from './img/photo_Nowe Zoo.jpg'

import './css/App.css'
import './css/responsive-styles.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'


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
    selectedPlace: '',
    photo:'',
    displaySideBar:'side-bar',
    icon:{},
    error:false
  }

  markerClicked = (props, marker, e) => {
    var keyNames = Object.keys(props);
console.log(`keyNames= ${keyNames}`);
console.log(`marker = ${Object.keys(marker)}`);
    console.log(`marker clicked :: props= ${props.name}, marker= ${marker.name} , e= ${e}`);

    this.setState({
      activeMarker: marker,
      selectedPlace:marker.name,
      showingInfoWindow: true,
      center:marker.position
    })
    console.log(`activeMarker= ${Object.keys(this.state.activeMarker)}`);
    //get the details from fourSquare API and set the marker info
    this.getActiveMarkerIdDetails(props)
    // this.updateMarkers(marker.name)
  }

  getActiveMarkerIdDetails = (marker) => {
    FoursquareAPI.getActiveMarkerId(marker.position.lat, marker.position.lng)
    .then(markerId => {
      if(markerId){
        console.log(`id =${markerId}`);
        this.getDetails(markerId)
      }else{
        console.log(`no id found!!!`);
      }
    })
    .catch(e => this.handleEerror(e))
  }

//get info about the place using the marker Id
  getDetails =(markerId)=> {
    console.log(`id2 =${markerId}`);
    FoursquareAPI.getMarkerDetails(markerId)
    .then((res)=> {
      if(res){
       console.log(`res= ${Object.keys(res.response.venue)}` );
        if('bestPhoto' in res.response.venue){
          console.log(`ther is a photo`);
          var imgSrc = res.response.venue.bestPhoto.prefix + '150x150' +  res.response.venue.bestPhoto.suffix
          this.setState({photo : imgSrc})
        }else {
          console.log(`no photo`);
          this.setState({
            photo: `photo_${this.state.activeMarker.name}.jpg`,
            error:true
          })
        }
      }else {
        console.log(`no result!!!!`);
        this.setState({
          photo: `photo_${this.state.activeMarker.name}.jpg`,
          error:true
        })
      }
    }).catch((e) => {
      this.handleEerror(e)})
  }

 //handle place info error by using local photos instead
  handleEerror =(e , markerId) => {
    this.setState({
      photo: `photo_${this.state.activeMarker.name}.jpg`,
      error:true
  })
    console.log(`e =${e}`);
  }

  mapClicked = () => {
    if (this.state.showingInfoWindow || this.state.selectedPlace!=='') {
      this.setState({
        showingPlaces:markers,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace:''
      })
    }
  }
// change places on the map and in the view list according to the search
  updateMarkers = (query)=> {
    console.log('update the markers inside the app');
    console.log(`the query = ${query}`);
    let showingPlaces
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingPlaces = markers.filter((marker)=> match.test(marker.title))
    } else{
      showingPlaces = markers
    }
    this.setState({showingPlaces})
  }

  // changeMapZoom =() => (this.setState({zoom : 12}))
//add animation to the marker when clicking its name on the view list
  choosePlace = (markerTitle) =>{
    console.log(`selectedPlace= ${markerTitle}`);
    // let selectedPlace
    // selectedPlace = markers.filter((m) => marker.title === m.title)
    this.setState({
      selectedPlace:markerTitle,
      showingInfoWindow:false
    })
  }

  closeingInfoWindow =()=> {
    this.setState({
      showingPlaces:markers,
      showingInfoWindow:false,
      activeMarker:{},
      photo:''
    })
  }
  //toggle the search input and view list
  toggleSideBar(displaySideBar){
    console.log(`toggle= ${this.state.displaySideBar} `);
    if(this.state.displaySideBar === 'side-bar') {
      this.setState({displaySideBar:'side-bar open'})
      console.log(`displaySideBar= ${this.state.displaySideBar}`)
    }  else{
      this.setState({displaySideBar:'side-bar'})
      console.log(`displaySideBar= ${this.state.displaySideBar}`)
    }
  }

  render() {
    return (
      <div className="App">
        <Header
          onToggleSideBar={(displaySideBar) => this.toggleSideBar(displaySideBar)}
        />
        <main className="main-content">
          <SideBar
            tabIndex='12'
            markers={this.state.showingPlaces}
            onchangeZoom={this.changeMapZoom}
            onUpdateMarkers={(query) => {
              this.updateMarkers(query)
            }}
            onChoosePlace={(markerTitle) => {
              this.choosePlace(markerTitle)
            }}
            {...this.state}
          />

          <MapContainer
            tabIndex='10'
            markers={this.state.showingPlaces}
            onUpdateMarkers={(query) => {
              this.updateMarkers(query)
            }}
            onMarkerClicked={this.markerClicked}
            title={'Neighborhood google map'}
            onMapClicked={this.mapClicked}
            getActiveMarkerIdDetails={this.getActiveMarkerIdDetails}
            closeingInfoWindow ={this.closeingInfoWindow}
            placeSelected={this.state.selectedPlace}
            {...this.state}
          />
        </main>
        <Footer/>
      </div>
    );
  }
}

export default NeighborhoodApp;
