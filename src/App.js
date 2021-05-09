import React, { Component } from 'react'
import Weather from './components/Weather'
import Form from './components/Form'

const API_KEY = 'ecee84f4598c07e50ef7b97d14fd6eac'
/*http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=ecee84f4598c07e50ef7b97d14fd6eac */
/* http://api.openweathermap.org/data/2.5/weather?q=cairo%2Cegypt&appid=e36ed364400282e43250b6c4c0274d44 */
class App extends Component {

  state = {
    temperature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }


  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=e36ed364400282e43250b6c4c0274d44`)
    const data = await api.json()
    console.log(data)
    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
        temperature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: 'Please Enter Data !'
      })
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <div className="weather">
            <img src='../cloudy-day-1.svg' className="icon" />
          </div>
          <Form getWeather={this.getWeather} getContry={this.getContry} />
          <Weather
            temperature={this.state.temperature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}

export default App;
