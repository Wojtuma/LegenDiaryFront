import React, {Component} from 'react'
class Weather extends Component {
constructor(props) {
    super(props)
   
    this.state = {
        latitude : null,
        longitude : null,
        data : {},
        
    }

}

async loadWeather()
{
    try{
    const encodedLatitude = encodeURIComponent(this.props.latitude);
    const encodedLongitude = encodeURIComponent(this.props.longitude);
            
    
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${encodedLatitude}&longitude=${encodedLongitude}&current_weather=true`)
    .then(response => response.json())
    .then(data => this.setState({data : data}))
} catch (error) {
                console.error('Error while loading weather data:', error);
            }
   
}
componentDidMount()
{
    this.loadWeather()
}
componentDidUpdate(prevProps) {
    if (prevProps.longitude !== this.props.longitude ||prevProps.latitude !== this.props.latitude ) {
    {
        this.loadWeather();
    }    
       
        
    }
}

render() {
    
    const weather = this.state.data;
    if (weather && weather.current_weather) {
    return ( <div>
        <p>{this.state.data.current_weather.temperature}</p>
            </div>
    )}
}
}

export default Weather