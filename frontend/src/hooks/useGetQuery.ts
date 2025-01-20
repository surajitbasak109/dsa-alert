import { useEffect, useState } from 'react';

type Props = {
  path: string;
};

function useGetQuery<T>({ path }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<T | null>(null);
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    const post = async () => {
      setIsLoading(true);
      try {
        const resp = await fetch(API_URL + path);
        const data = await resp.json();
        if (!resp.ok) {
          setError(data);
        }
        setData(data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    post();
  }, [path]);

  return { isLoading, error, data };
}

export default useGetQuery;
