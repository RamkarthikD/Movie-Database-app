import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Movie {
  imdb_id: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  const key = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setMovie(jsonData);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    }
    fetchMovie();
  }, [url]);

  useEffect(() => {
    if (movie) {
      document.title = movie.title;
    }
  }, [movie]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ maxWidth: "300px" }}
      />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Rating:</strong> {movie.vote_average}</p>
      <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(", ")}</p>
      <a  target="_blank" href={`https://www.imdb.com/title/${movie.imdb_id}/`}>View in IMDB</a>
    </div>
  );
};

