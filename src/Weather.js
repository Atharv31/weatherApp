
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'

function Weather() {

  const [city, setCity] = useState('');
  const [cityCheck, setCityCheck] = useState(false);
  const [cityCall, setCityCall] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = '8f0b062d4273476687d142244231711'; // change this to your api key
  const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`;

  const getData = () => {
    axios.get(url)
      .then(res => {console.log(res.data)
        setWeatherData(res.data)})
      .catch(err => console.log(err))
  }
  useEffect(()=>{},[]);
  useEffect(() => {
    // Execute getData only when the city is entered
    if (city.trim() !== '' && city.length>1) {
      getData();
      setCityCall(false);
    }
  }, [cityCall]);

  const handleChange = (e) => {
    setCity(e.target.value);
  }

  

  const handleKeypress = () => {
    //it triggers by pressing the enter key
    if(city!==''){
      setCityCheck(true);
      setCityCall(true);
    }
    
  };

  const name = weatherData ? weatherData.location.name : '';
  const country = weatherData ? weatherData.location.country : '';
  const humidity = weatherData ? weatherData.current.humidity : '';
  const pressure = weatherData ? weatherData.current.pressure_mb : '';
  const temp = weatherData ? weatherData.current.temp_c : '';
  const weather = weatherData ? weatherData.current.condition.text : '';
  const iconcode = weatherData ? weatherData.current.condition.icon : '#';

  const d = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return (
    <div className="App">
      <header className="App-header" >
        
        <div className="weather" style={{margin:"50px"}}>
          <input id="weatherInput" type="text" name="city" placeholde="city name"
            placeholder='Enter City Name'
            onChange={handleChange}
          />
          <button onClick={handleKeypress}>Search</button>
        </div>

        {cityCheck ? <div className="results" style={styles.results}>
          <div style={{ fontSize: 30 }}>{name}, {country}</div>

          <div style={{ color: 'darkgrey', fontSize: 18 }}>{days[d.getDay()]}, {month[d.getMonth()]} {d.getDate()}, {d.getFullYear()}</div>

          <div style={{ fontSize: 54, fontWeight: 'bold' }}>{Math.round(temp)}' C</div>

          <img src={`http:${iconcode}`} alt="Weather icon" />

          <div style={{ textTransform: 'capitalize', marginBottom: 20 }}>{weather}</div>

          <div>Humidity : {humidity} %</div>
          <div>Pressure : {pressure} milliBars</div>
        </div> :<div></div>}
      </header>
    </div>
  );
}

const styles = {
  results: {
    border: '1px solid #111111',
    borderRadius: 15,
    backgroundColor: '#111',
    padding: '2rem',
    margin: '1rem',
    boxShadow: 'rgb(84 179 207 / 50%) 3px 3px 2px 0px',
  }
}

export default Weather;
