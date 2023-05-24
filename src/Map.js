import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Weather from './Weather';

mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;

class Map extends React.PureComponent {
constructor(props) {
    super(props);
    this.state = {
        lng: 19.52,
        lat: 52.16,
        zoom: 6,
   
    };
    

    this.mapContainer = React.createRef();
}
async loadLegends(mapa){
    fetch('http://localhost:8081/places')
    .then(response => response.json())
    .then(data => 
this.addMarkers(data,mapa))
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
    
    
    
    const marker = new mapboxgl.Marker({
        color: "red",
        draggable: true
        }).setLngLat([this.state.lng,this.state.lat])
        .addTo(mapa)

        mapa.on('move', () => {
            this.setState({
            lng: mapa.getCenter().lng.toFixed(4),
            lat: mapa.getCenter().lat.toFixed(4),
            zoom: mapa.getZoom().toFixed(2)
            });
            marker.setLngLat([mapa.getCenter().lng.toFixed(4),mapa.getCenter().lat.toFixed(4)])
        });
    


    
}
// componentDidUpdate(prevProps, prevState) {
//     // Sprawdzamy czy zmieniły się współrzędne
//     if (prevState.lat !== this.state.lat || prevState.lng !== this.state.lng) {
//       // Wywołujemy funkcję do wczytywania danych pogodowych po zmianie współrzędnych
//       this.loadWeatherData();
//     }
//   }

render() {
    console.log(process.env.REACT_APP_MAP_API_KEY)
    return (
    <div>
        <div className="sidebar">
        Longitude: {this.state.lng} | Latitude: {this.state.lat}
        </div>
        <div >
            <div ref={this.mapContainer} className="map-container" />
        </div>
        {/* <Weather latitude={this.state.lat} longitude={this.state.lng} /> */}

    </div>
    );
}
}

export default Map