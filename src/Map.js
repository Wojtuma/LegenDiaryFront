import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Weather from './Weather';
import MapboxGeocoder from './MapGeocoder';

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

class Map extends React.PureComponent {
constructor(props) {
    super(props);
    this.state = {
        lng: 19.52,
        lat: 52.16,
        zoom: 6
   
    };
    

    this.mapContainer = React.createRef();
}
async loadLegends(mapa){
    fetch('http://localhost:8081/places')
    .then(response => response.json())
    .then(data => 
this.addMarkers(data,mapa))
}

async loadRadio(mapa){
    fetch('https://at1.api.radio-browser.info/json/stations/search?limit=1000&countrycode=PL&hidebroken=true&order=votes&reverse=true')
    .then(response => response.json())
    .then(data => this.addMarkersRadio(data,mapa)
    )
}
addMarkersRadio(data,mapa){
    
    
    data.map(radio=>{new mapboxgl.Marker({
        color: "blue",
        draggable: false
        }).setLngLat([radio.geo_long, radio.geo_lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${radio.name}</h3>`))
        .addTo(mapa);
    })
}
addMarkers(data,mapa){
    
    
    data.map(legend=>{new mapboxgl.Marker({
        color: "darkgreen",
        draggable: false
        }).setLngLat([legend.longitude, legend.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${legend.name}</h3>`))
        .addTo(mapa);
    })
}
componentDidMount() {
    

    const { lng, lat, zoom } = this.state;
    const mapa = new mapboxgl.Map({
    container: this.mapContainer.current,
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [lng, lat],
    zoom: zoom
    });
    mapa.addControl(new mapboxgl.NavigationControl());
    this.loadLegends(mapa);
    this.loadRadio(mapa);
    
    mapa.on('load', function() {
        mapa.addSource('countries', {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1'
        });
    mapa.addLayer({
        'id': 'country-boundaries',
        'type': 'fill',
        'source': 'countries',
        'source-layer': 'country_boundaries',
        'paint': {
          'fill-color': '#cccccc',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'active'], false],
            1,
            0.2
          ]
        },
        'filter': ['!=', 'iso_3166_1_alpha_3', 'POL']
      });
    });
    
    const marker = new mapboxgl.Marker({
        color: "red",
        draggable: false
        }).setLngLat([this.state.lng,this.state.lat])
        .addTo(mapa)
    
    mapa.on('move', () => {
            this.setState({
            lng: mapa.getCenter().lng.toFixed(4),
            lat: mapa.getCenter().lat.toFixed(4),
            zoom: mapa.getZoom().toFixed(2),
            });
            marker.setLngLat([mapa.getCenter().lng.toFixed(4),mapa.getCenter().lat.toFixed(4)])
        });
    


    
}


render() {

    return (
    <div>
        <div className="sidebar">
        Longitude: {this.state.lng} | Latitude: {this.state.lat}  |<Weather latitude={this.state.lat} longitude={this.state.lng} /> <MapboxGeocoder longitude={this.state.lng} latitude={this.state.lat} />
        </div>
        <div >
            <div ref={this.mapContainer} className="map-container" />
        </div>
        

    </div>
    );
}
}

export default Map