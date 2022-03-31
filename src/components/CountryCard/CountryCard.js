import { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./CountryCard.css";

export default function CountryCard() {
    const params = useParams();

    const context = useContext(AppContext);

    const countries = context.countries;

    const country = countries.filter(country => country.name.common.toLowerCase() === params.code)[0];

    const languages = Object.values(country.languages);

    const navigate = useNavigate();

    return (
        <div>
            <div className="button-container">
                <button onClick={() => {
                    const country_name_to_navigate = context.getRandomCountry(countries);

                    navigate(`/country/${country_name_to_navigate}`, { replace: true });
                }
                }>Get a random country</button>
            </div>

            <div className="button-container">
                <Link to="/">
                    <button>Return to country list</button>
                </Link>
            </div>

            <div className="country-card">
                <img src={country.flags.png} alt={country.name.common} />

                <div className="country-card-item"><h3>{country.name.common}</h3></div>

                <div className="country-card-item">Official name : {country.name.official}</div>

                <div className="country-card-item">Region : {country.region}</div>

                {country.capital && <div className="country-card-item">Capital{country.capital.length > 1 && "s"} : {country.capital.map((capital, index) => <span key={capital}>{capital + `${index !== country.capital.length-1 ? ", " : ""}`}</span>)}</div>}

                <div className="country-card-item">Language{languages.length > 1 && "s"} : {languages.map((language, index) => <span key={index}>{language + `${index !== languages.length-1 ? ", " : ""}`}</span>)}</div>

                <div className="country-card-item">Population : {country.population}</div>
            </div>
        </div>
    )
}