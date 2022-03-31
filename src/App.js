import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList/CountryList';
import CountryCard from './components/CountryCard/CountryCard';
import "./App.css";

export const AppContext = createContext();

export default function App() {
  const [countries, setCountries] = useState([]);

  const context = {
    countries,
    getRandomCountry
  }

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(response => setCountries(response))

    document.title = "Learn Countries App";
  }, [])

  return (
    <AppContext.Provider value={context}>
      <Router>
        <div className="App">
          <h1>Learn countries by the cards</h1>

          <Routes>
            <Route path="/" element={<CountryList />} />

            <Route path="/country/:code" element={<CountryCard />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

const getRandomCountry = (countries) => {
  const country_id = Math.floor(Math.random() * countries.length);

  const country_name_to_navigate = countries[country_id].name.common.toLowerCase();

  return country_name_to_navigate;
}