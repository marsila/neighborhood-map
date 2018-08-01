import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SideBar extends Component {
  state = {
    query:''
  }

  updateQuery = (query) => {
    this.setState({query})
    this.updateMarkersPlaces()
  }

  updateMarkersPlaces = () => {
    console.log('update the places');
    this.props.onUpdateMarkers()
  }

  render(){

    const {markers} = this.props
    const {query} = this.state
    let showingPlaces

    //Update the view list markers according to the search
    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingPlaces = markers.filter((marker)=> match.test(marker.title))
    } else{
      showingPlaces = markers
    }
    showingPlaces.sort(sortBy('title'))

    return(
      <section className="side-bar">
        <div className="search-places">
          <input
            type="text"
            placeholder="Search by place name"
            value={query}
            onChange={(event)=> this.updateQuery(event.target.value)}
          />

        </div>
        <div className="view-list-markers">
          <ul>
            {
              showingPlaces.map((marker, index) => (
              <li key={index}>
                <h3 className="marker-name" onClick={this.updateMarkersPlaces}> {marker.title}</h3>
              </li>
            ))
           }
         </ul>
        </div>


      </section>
    )
  }

}

export default SideBar;
