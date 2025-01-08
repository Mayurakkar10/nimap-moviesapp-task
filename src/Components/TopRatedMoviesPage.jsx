import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function TopRatedMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // Log the result to inspect the data structure
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div className="container-fluid" style={{ backgroundColor: "#282C34" }}>
      <div className="container pt-5 text-white">
        {error && <p>Error: {error}</p>}
        <div
          style={{
            display: "flex",
            flexBasis: "100%",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                padding: "10px",
                width: "300px",
                textAlign: "center",
              }}
              className="mycard"
            >
              <Link
                to={`/singlepage/${movie.id}`}
                className="nav-link text-white"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                  style={{ width: "100%", borderRadius: "10px" }}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/200")
                  } // Fallback for missing images
                />
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
