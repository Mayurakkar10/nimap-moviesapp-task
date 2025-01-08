import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPopularMovies();
  }, [apiKey, currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container-fluid p-5" style={{ backgroundColor: "#282C34" }}>
      <div className="container d-flex pt-5">
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
              className="text-white mycard"
            >
              <Link
                to={`/singlepage/${movie.id}`}
                className="nav-link text-white"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                  style={{ width: "100%" }}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/200")
                  }
                />
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination container d-flex space-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline-white text-white"
        >
          Previous
        </button>
        <span className="text-white p-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-outline-white text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
}
