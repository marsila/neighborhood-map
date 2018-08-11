
const client_id = 'ZDRART5G3PP3GPHJM2N2ZEMVBITJLH233SYBGQ5GKNXVDB5K'
const client_secret = 'PQFVB3IPX1TI0QAYQ3TGW1RT1S3V2XZHUPM53UPCCIGZ4I3F'
const version = "20180323"
const radius = 250
const search_limit = 1

//I handled API errors by providing local photos for the defined places on the map
export const getActiveMarker = (lat, lng) =>
  fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&limit=${search_limit}&radius=${radius}
    	&client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res =>  res.json())
  .then(data => data.response.venues[0])
  .catch(e => alert(`Opsss!! FoursquareAPI error: ${e}`))

export const getActiveMarkerId = (lat, lng) =>
  fetch(`https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&limit=${search_limit}&radius=${radius}
      &client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res =>  res.json())
  .then(res => res.response.venues[0].id)
  .catch(e => {
      alert(`Opsss!! Foursquare API error!. We will present you static photos`);
      //To be catched on getDetails function and display local images
      throw e;
    })


export const getMarkerDetails = (markerId) =>
  fetch(`https://api.foursquare.com/v2/venues/${markerId}?client_id=${client_id}&client_secret=${client_secret}&v=${version}`)
  .then(res => res.json())
  .catch(e => {
      alert(`Opsss!! Foursquare API error!. We will present you static photos`);
      throw e;
    })
