
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([ ])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      
    })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleSearch = (event) => {
      setSearch(event.target.value)
  }
  
  return (
    <div >
      <form>
        find countries <input country="text" onChange={handleSearch}>
        </input>
      </form>
     <Countries countries={countries} search={search} setSearch={setSearch}/>
    </div>
  );
}
const Countries = ({ setSearch, search, countries}) => {
  const countriesToShow = 
    countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    console.log('countries.length', countriesToShow.length)

    if (countriesToShow.length > 10)
    
     return (
     <div>
       Too many matches, please specify another filter
       </div>
      )
      else if (countriesToShow.length === 1)
      return  (
        <div>
          <ul>
          {countriesToShow.map(country =>  
          <SingleCountry key={country.alpha2Code} country={country} />
          )}
          </ul> 
        </div>
       
      )

      else
    
      return (
        <div>
          <ul>
            {countriesToShow.map(country => 
            <li key={country.alpha2Code}>
             {country.name}
             <button onClick={() => setSearch(country.name)}>
               show
              </button>
            </li>
              )}
          </ul>
        </div>
      )   
} 


const SingleCountry = ( {country }) => {
  
 return (
   <div>
     <ul>
       <h2>{country.name}</h2>
       <p>capital {country.capital}
       </p>
       <p>
         population {country.population} 
         </p>
         <h4>languages</h4>
         <ul>
           {country.languages.map(language => 
           <li key={language.iso639_1}>{language.name}</li>
           )}
           </ul>
           </ul>
           <br></br>
           <img alt='flag' src={country.flag} width="150" height="100"></img>
           </div>
           )
}


export default App;
