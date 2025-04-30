import { useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";


interface SearchProps {
  apiPath: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export const Search: React.FC<SearchProps> = ({ apiPath }) => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q") || "";

  const { data: movies } = useFetch<Movie>({ apiPath, queryTerm });

  useEffect(() => {
    document.title = `Search result for ${queryTerm}`;
  }, [queryTerm]);

  return (
    <main className="container">
      <h5>Search results for: <em>{queryTerm}</em></h5>
      <div className="row row-cols-3">
        {movies.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            linkUrl={movie.id.toString()}
          />
        ))}
      </div>
    </main>
  );
};
