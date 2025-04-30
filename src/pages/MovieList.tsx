import { useEffect } from "react";
import { Card } from "../components/Card";
import { useFetch } from "../hooks/useFetch";

interface MovieListProps {
  title: string;
  apiPath: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export const MovieList: React.FC<MovieListProps> = ({ title, apiPath }) => {
  const { data: movies } = useFetch<Movie>({ apiPath });

  useEffect(() => {
    document.title = title;
  }, [title]);


  return (
    <div>
      <main className="container">
        <h5 className="border-bottom">{title}</h5>
        <div className="row row-cols-3 ">
        {movies.map((movie) => (
  <div className="col" key={movie.id}>
    <Card
      title={movie.title}
      overview={movie.overview}
      imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      linkUrl={movie.id.toString()}
    />
  </div>
))}

        </div>
      </main>
    </div>
  );
};
