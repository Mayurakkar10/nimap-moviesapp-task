import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSearchResults();
  }, [query, apiKey]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#282C34" }}>
      <div className="container bt-3 d-flex flex-wrap">
        {/* <h2 className="mb-5 text-white">Search Results for "{query}"</h2> */}
        <div className="row">
          {results.map((movie) => (
            <div key={movie.id} className="col-md-3 mb-4 ">
              <Link to={`/movie/${movie.id}`} className="nav-link text-white">
                <div
                  className="mycard"
                  style={{
                    padding: "10px",
                    width: "300px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/500x750")
                    }
                  />
                  <div>
                    <h3>{movie.title}</h3>
                    <p>Rating: {movie.vote_average}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
