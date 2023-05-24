import React, {Component} from 'react'
class Weather extends Component {
constructor(props) {
    super(props)
   
    this.state = {
        latitude : props.latitude,
        longitude : props.longitude,
        data : {},
        
    }

}

async loadWeather()
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=${process.env.REACT_APP_WEATHER}&units=metric`)
    .then(response => response.json())
    .then(data => this.setState({data : data}))
    
   
}
componentDidMount()
{
    this.loadWeather()
}

render() {
   
    const weather = this.state.data;
    if (weather && weather.main) {
    return ( <div>
        <h1>{this.state.data.name}</h1>
        <p>{this.state.data.main.temp}</p>
            </div>
    )}
}
}

export default Weather




    

