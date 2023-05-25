import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Weather from './Weather';
import Navbar from './Navbar';
mapboxgl.accessToken = process.env.REACT_APP_MAP_API_KEY;
class Map extends React.PureComponent {
constructor(props) {
    super(props);
    this.state = {
        lng: 19.52,
        lat: 52.16,
        zoom: 6,
        inputValue : 0,
        markers : []
   
    };
    

    this.mapContainer = React.createRef();
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
    // this.loadLegends(mapa);
    
    
    
    const marker = new mapboxgl.Marker({
        color: "red",
        draggable: false
        }).setLngLat([this.state.lng,this.state.lat])
        .addTo(mapa)

        mapa.on('move', () => {
            this.setState({
            lng: mapa.getCenter().lng.toFixed(4),
            lat: mapa.getCenter().lat.toFixed(4),
            zoom: mapa.getZoom().toFixed(2)
            });
            marker.setLngLat([mapa.getCenter().lng.toFixed(4),mapa.getCenter().lat.toFixed(4)]);
            this.loadLegends()
        });
    
        this.mapa = mapa;
        this.marker = marker;
 
}
loadLegends = () => {
    const { lat, lng, inputValue } = this.state;

    fetch(`http://localhost:8081/placeNearby?lat=${lat}&lng=${lng}&distance=${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        // Usunięcie poprzednich znaczników
        this.state.markers.forEach((marker) => {
          marker.remove();
        });

        
        const newMarkers = data.map((legend) => {
          const newMarker = new mapboxgl.Marker({
            color: 'darkgreen',
            draggable: false,
          })
            .setLngLat([legend.longitude, legend.latitude])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${legend.name}</h3>`))
            .addTo(this.mapa);

          return newMarker;
        });


        this.setState({ markers: newMarkers });
      });
  };
handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };
// componentDidUpdate(prevProps, prevState) {
//     // Sprawdzamy czy zmieniły się współrzędne
//     if (prevState.lat !== this.state.lat || prevState.lng !== this.state.lng) {
//       // Wywołujemy funkcję do wczytywania danych pogodowych po zmianie współrzędnych
//       this.loadWeatherData();
//     }
//   }

render() {
    const { lng, lat, inputValue } = this.state;
    return (
    <div>
        <Navbar />
        <div>
          <label id="distance">Zakres odległości legend w kilometrach od znacznika</label>
      <input name="distance" type="text" value={inputValue} onChange={this.handleInputChange} />
      {/* <button onClick={this.loadLegends}>Szukaj</button> */}
    </div>
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