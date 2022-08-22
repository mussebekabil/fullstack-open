import { useState, useEffect } from 'react'
import axios from 'axios';
import Filter from './Filter';
import Country from './Country';

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState(null)
  // define REACT_APP_API_KEY in .env file
  const API_KEY = process.env.REACT_APP_API_KEY;
  
  useEffect(() => {
    if(filter !== '') {
      axios.get(`https://restcountries.com/v3.1/name/${filter}`)
        .then(response => {
          setCountries(response.data)
        })
        .catch(reason => {
          console.log(reason)
          setCountries([])
        })
    }
    setCountries([])
  }, [filter])

  useEffect(() => {
    if(countries.length === 1) {
      const { capital, cca2 } = countries[0];
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital},${cca2}&APPID=${API_KEY}&units=metric`;
      axios.get(url)
        .then(response => {
          setWeather(response.data)
        })
        .catch(reason => {
          console.log(reason)
          setWeather(null)
        })
    }
  }, [countries, API_KEY])

  const renderCountries = () => {
    const { length } = countries;
    switch (true) {
      case length === 0:
        return <div>No country found, specify another filter</div>
      case length === 1:
        return <Country country={countries[0]} weather={weather}/>
      case length <= 10: 
        return (
          <div>
            {countries.map(country => (
            <p key={country.ccn3}>{country.name.common} <button onClick={() => setCountries([country])}>show</button></p>
            ))}
          </div>
        )
      case length > 10: 
        return <div>Too many matches, specify another filter</div>
      default:
        return ''
    } 
  }
  return (
    <div>
      <h2>Countries</h2>
      <Filter filter={filter} setFilter={setFilter} />
      {renderCountries()}
    </div>
  )
}

export default App
