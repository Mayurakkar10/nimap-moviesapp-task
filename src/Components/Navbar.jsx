import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PopularMoviesPage from "./PopularMoviesPage";
import TopRatedMoviesPage from "./TopRatedMoviesPage";
import UpcomingMoviesPage from "./UpcomingMoviesPage";
import SearchResult from "./SearchResult"; // Correct component for search results
import SinglePage from "./SinglePage";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Navigate to search results with query as parameter in the URL
    window.location.href = `/search?query=${searchTerm}`;
  };

  return (
    <BrowserRouter>
      <nav
        className="navbar navbar-expand-lg text-white"
        style={{ backgroundColor: "#33393F" }}
      >
        <div className="container">
          <h1 className="me-5">MoviesDb</h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/popular" className="nav-link text-white">
                  Popular Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/toprated" className="nav-link text-white">
                  Top Rated
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/upcoming" className="nav-link text-white">
                  Upcoming Movies
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                className="btn"
                type="submit"
                style={{ backgroundColor: "#6C757D", color: "white" }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<PopularMoviesPage />}></Route>
        <Route path="/popular" element={<PopularMoviesPage />} />
        <Route path="/toprated" element={<TopRatedMoviesPage />} />
        <Route path="/upcoming" element={<UpcomingMoviesPage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/singlepage/:movieId" element={<SinglePage />} />
      </Routes>
    </BrowserRouter>
  );
}
