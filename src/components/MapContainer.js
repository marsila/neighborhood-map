
import React, { Component } from 'react';
import {Map, Marker, InfoWindow, GoogleApiWrapper} from 'google-maps-react'
import PropTypes from 'prop-types'

/* import local photos that was tooken from wikibedia
 to use them when there is an error loading photos from third-party API*/
import photo_StaryRynek from './img/photo_Stary Rynek.jpg'
import photo_CytadelaPark from './img/photo_Cytadela Park.jpg'
import photo_PolitechnikaPoznanska from './img/photo_Politechnika Poznanska.jpg'
import photo_PosnaniaMall from './img/photo_Posnania Mall.jpg'
import photo_TermyMaltańskie from './img/photo_Termy Maltańskie.jpg'
import photo_NoweZoo from './img/photo_Nowe Zoo.jpg'




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

  choosePlace = (props, marker, e) => {
    this.props.onMarkerClicked(props, marker, e)
  }

  clickTheMap = () => {
    this.props.onMapClicked()
  }

  render(){
    const style = {
    width: '100%',
    height: '100%'
    }
    const defaultIcon = {
      url:'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|225a8e|40|_|%E2%80%A2',
      scaledSize:new this.props.google.maps.Size(21, 34)
    }
    const highlightedIcon = {
      url:'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|ad057c|40|_|%E2%80%A2',
      scaledSize: new this.props.google.maps.Size(21, 34)
    }
    const imageName= './img/' +this.props.photo;

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
  apiKey: 'AIzaSyDqRj6EWf5JU1UO-nQME_tLjWL12uOmFyc',
  // apiKey:'AIzaSyAJP082u57ioi_x09Rt6dwQ9QGMtVpEm7o'
})(MapContainer)
