import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import "./CountryList.css";

export default function CountryList() {
    const context = useContext(AppContext);

    const countries = context.countries;

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

            <div className="country-list">
                {countries.length === 0 ?
                <div className="loader"></div> :

                countries.map((country, index) =>
                    <div key={index} className="country">
                        <Link to={`/country/${country.name.common.toLowerCase()}`}>
                            <img src={country.flags.png} alt="Country flag" />

                            {country.name.common}
                        </Link>
                    </div>)
                }
            </div>
        </div>
    )
}