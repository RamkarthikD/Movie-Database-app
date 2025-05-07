import { useEffect, useState } from "react";
import { Card } from "../components/Card";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface MovieListProps {
  title: string;
  apiPath: string;
}

export const MovieList: React.FC<MovieListProps> = ({ title, apiPath }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${apiKey}`;

  useEffect(() => {
    document.title = title;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []));
  }, [url, title]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container">
      <h2 className="my-3" style={{marginTop:"1000 px"}}>{title}</h2>

      <div className="mb-4 position-relative">
  <input
    type="text"
    className="form-control pe-5"
    placeholder="Search movies"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  {searchTerm && (
    <button
      type="button"
      onClick={() => setSearchTerm("")}
      className="btn btn-sm btn-light position-absolute"
      style={{
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        padding: "0 0.5rem",
        border: "none",
      }}
    >
      ×
    </button>
  )}
</div>
      {filteredMovies.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {filteredMovies.map((movie) => (
            <Card
              key={movie.id}
              title={movie.title}
              overview={movie.overview}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              linkUrl={movie.id.toString()}
            />
          ))}
        </div>
      ) : (
        <p>No movies found for "{searchTerm}".</p>
      )}
    </main>
  );
};
