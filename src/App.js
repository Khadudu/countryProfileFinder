import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
const [countries, setCountries] = useState([])
const [searchTerm, setSearchTerm] = useState("")
const [searchResult, setSearchResult] = useState([])

useEffect(() => {
axios
.get("https://restcountries.eu/rest/v2/all")
.then(responce=>{
  setCountries(responce.data)
})
}, [])

function handleSearchInput(event){
  setSearchTerm(event.target.value)
}
useEffect(() => {
 const result = countries.filter((country)=>{
 return country.name.toLowerCase().includes(searchTerm.toLowerCase())
 })
 setSearchResult(result) 
}, [searchTerm, countries])

function CountDetails(){
  return <div>
    <ul>{searchResult.map((country)=>{
  return <div key={country.name}><li >{country.name}</li>
  {/*<button>show</button>*/}
  </div>
  })}</ul>
  </div> 
}

function CountryData(){
  return <div>
  <ul>{searchResult.map((country)=>{
    return <div key={country.name}>
      <h2><strong>{country.name}</strong></h2>  <br/><br/>
        Capital: {country.capital} <br/>
        Population: {country.population}<br/><br/>
        <strong>languages</strong>  <br/>
        <ul>
          {country.languages.map((language)=>{
          return <li key={language.name}>{language.name}</li>
          })}
          <img src={country.flag} alt=""/> <br/><br/>
        <h2><strong>Weather in {country.capital}</strong></h2>
        <strong>temperature</strong>
        </ul>   
 </div>    
})} </ul></div> 
}

function LessThanTen(){
  return <p>Less than ten</p>
}

function MoreThanTen(){
  return <p>Too many matches for that filter, try another filter</p>
}

  return (
    <div className="App"
    
    show={{'backgroundColor': searchResult > 10 ? <MoreThanTen/> : searchResult === 1 ? <CountryData/> : <CountDetails/>}}
    >
     find countries <input type="search" value={searchTerm} onChange={handleSearchInput}/>
     {/*{(searchResult.length > 9 && searchTerm.length > 0 )?<MoreThanTen/>:<CountDetails/>}*/}
    
     {(searchResult.length > 10 && searchTerm.length>0)
     ? <MoreThanTen/> : 
     searchResult.length === 1 
     ? <CountryData/> : 
     (<div>
       <CountDetails/>
       <button>show</button>
     </div> )
  } 
     
    </div>
  );
}

export default App;
