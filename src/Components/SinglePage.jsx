import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SinglePage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const apiKey = "c45a857c193f6302f2b5061c3b85e743";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchMovieCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
  }, [movieId, apiKey]);

  const formatDuration = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movieDetails) {
    return <p>Loading movie details...</p>;
  }

  return (
    <div style={styles.pageContainer}>
      <div
        style={{
          ...styles.banner,
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        }}
      >
        <div style={styles.bannerContent}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
            alt={`${movieDetails.title} Poster`}
            style={styles.poster}
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/200x300")
            }
          />
          <div style={styles.details}>
            <h1 style={styles.title}>{movieDetails.title}</h1>
            <p style={styles.rating}>Rating: {movieDetails.vote_average}</p>
            <p>{formatDuration(movieDetails.runtime)}</p>
            <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>
            <p>Release Date: {movieDetails.release_date}</p>
            <p style={styles.overview}>{movieDetails.overview}</p>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div style={styles.castContainer}>
        <h2 style={styles.castTitle}>Cast:</h2>
        <div style={styles.castList}>
          {cast.map((member) => (
            <div key={member.id} style={styles.castItem}>
              <img
                src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                alt={member.name}
                style={styles.castImage}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150x225")
                }
              />
              <div style={styles.castInfo}>
                <p style={styles.castName}>{member.name}</p>
                <p style={styles.castCharacter}>as {member.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    backgroundColor: "#1c1c1c",
    color: "white",
    minHeight: "100vh",
    padding: "0",
  },
  banner: {
    height: "500px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContent: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "20px",
    borderRadius: "10px",
  },
  poster: {
    width: "200px",
    borderRadius: "10px",
    marginRight: "20px",
  },
  details: {
    maxWidth: "600px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  rating: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  overview: {
    marginTop: "20px",
    lineHeight: "1.6",
  },
  castContainer: {
    marginTop: "40px",
    padding: "20px",
  },
  castTitle: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  castList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  castItem: {
    width: "150px",
    textAlign: "center",
  },
  castImage: {
    width: "100%",
    borderRadius: "10px",
  },
  castInfo: {
    marginTop: "10px",
  },
  castName: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  castCharacter: {
    fontSize: "0.9rem",
    color: "#ccc",
  },
};
