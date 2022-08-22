const Country = ({ country, weather }) => (<div>

  <h1>{country.name.common}</h1>

  <p>capital {country.capital}</p>
  <p>area {country.area}</p>

  <h3>languages:</h3>
  <ul>
    {Object.entries(country.languages).map(([key, val]) => <li key={key}>{val}</li>)}
  </ul>

  <img src={country.flags.png} alt={`${country.name.common} flag`}></img>
  {weather && (<div>
    <h2>Weather in {country.capital}</h2>

    <p>temperature {weather.main.temp} Celicius</p>

    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"></img>

    <p>wind {weather.wind.speed} m/s</p>
  </div>)}
</div>);

export default Country;
