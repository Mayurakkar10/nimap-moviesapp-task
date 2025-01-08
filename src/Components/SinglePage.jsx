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
      <div style={styles.movieDetailsContainer}>
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
          alt={`${movieDetails.title} Poster`}
          style={styles.poster}
          onError={(e) =>
            (e.target.src = "https://via.placeholder.com/300x450")
          }
        />
        <div style={styles.details}>
          <h1 style={styles.title}>{movieDetails.title}</h1>
          <p style={styles.overview}>{movieDetails.overview}</p>
          <p>
            <strong>Release Date:</strong> {movieDetails.release_date}
          </p>
          <p>
            <strong>Duration:</strong> {formatDuration(movieDetails.runtime)}
          </p>
          <p>
            <strong>Rating:</strong> {movieDetails.vote_average}/10
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </p>
        </div>
      </div>

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
    padding: "20px",
    backgroundColor: "#1c1c1c",
    color: "white",
    minHeight: "100vh",
  },
  movieDetailsContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    marginBottom: "30px",
  },
  poster: {
    width: "300px",
    borderRadius: "10px",
  },
  details: {
    maxWidth: "600px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  overview: {
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  castContainer: {
    marginTop: "40px",
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
