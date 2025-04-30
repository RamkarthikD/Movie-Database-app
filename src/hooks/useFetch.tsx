import { useEffect, useState } from 'react';

interface UseFetchProps {
  apiPath: string;
  queryTerm?: string;
}



export const useFetch = <T,>({ apiPath, queryTerm = "" }: UseFetchProps) => {
    console.log(apiPath);
  const [data, setData] = useState<T[]>([]);

  const key = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&query=${queryTerm}`;

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    }
    fetchMovies();
  }, [url]);

  return { data };
};
