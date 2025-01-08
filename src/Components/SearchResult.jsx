import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function SearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page")) || 1;
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(
            query
          )}&page=${page}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ query, page: newPage });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container-fluid" style={{ backgroundColor: "#282C34" }}>
      <div className="container pt-3">
        {isLoading ? (
          <p className="text-white">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-white">No results found for "{query}".</p>
        ) : (
          <>
            <div className="row">
              {results.map((movie) => (
                <div key={movie.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                  <Link
                    to={`/movie/${movie.id}`}
                    className="nav-link text-white"
                  >
                    <div className="card h-100 text-center bg-dark text-white">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        className="card-img-top img-fluid"
                        alt={movie.title}
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/500x750")
                        }
                      />
                      <div className="card-body">
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">
                          Rating: {movie.vote_average}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="text-white">
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
