
import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import MapContainer from './components/MapContainer'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Footer from './components/Footer'
import * as FoursquareAPI from './FoursquareAPI'


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
    showingPlaces:[],
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

  componentDidMount(){
    this.setState({showingPlaces: markers})
  }

  markerClicked = (props, marker, e) => {
    this.setState({
      activeMarker: marker,
      selectedPlace:marker.name,
      showingInfoWindow: true,
      center:marker.position
    })
    //get the details from fourSquare API and set the marker info
    this.getActiveMarkerIdDetails(props)
  }

  getActiveMarkerIdDetails = (marker) => {
    FoursquareAPI.getActiveMarkerId(marker.position.lat, marker.position.lng)
    .then(markerId => {
      if(markerId){
        this.getDetails(markerId)
      }else{
        console.log(`no id found!!!`);
      }
    })
    .catch(e => this.viewDefaultImage())
  }

//get info about the place using the marker Id
  getDetails =(markerId)=> {
    FoursquareAPI.getMarkerDetails(markerId)
    .then((res)=> {
      if(res){
       if('bestPhoto' in res.response.venue){
          var imgSrc = res.response.venue.bestPhoto.prefix + '150x150' +  res.response.venue.bestPhoto.suffix
          this.setState({photo : imgSrc})
        }else {
          this.viewDefaultImage()
        }
      }else {
        this.viewDefaultImage()
      }
    }).catch(e => {
      this.viewDefaultImage()})
  }

 //handle place info error by using local photos instead
  viewDefaultImage =( markerId) => {
    this.setState({
      photo: `photo_${this.state.activeMarker.name}.jpg`,
      error:true
    })
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
    let showingPlaces
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingPlaces = markers.filter((marker)=> match.test(marker.title))
    } else{
      showingPlaces = markers
    }
    this.setState({showingPlaces})
  }

  choosePlace = (markerTitle) =>{
    this.setState({
      selectedPlace:markerTitle,
      showingInfoWindow:false
    })
  }

  closeingInfoWindow =()=> {
    this.setState({
      showingPlaces:markers,
      showingInfoWindow:false,
      activeMarker:{}

    })
  }
  //toggle the search input and view list
  toggleSideBar(displaySideBar){
    if(this.state.displaySideBar === 'side-bar') {
      this.setState({displaySideBar:'side-bar open'})
    }  else{
      this.setState({displaySideBar:'side-bar'})
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
