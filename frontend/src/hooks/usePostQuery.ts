import { useEffect, useState } from 'react';

type Props = {
  path: string;
  method: 'POST' | 'PUT';
  body: Record<string, unknown>;
};

const useGetQuery = ({ path, method = 'POST', body }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<unknown | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  useEffect(() => {
    const post = async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      setIsLoading(true);
      try {
        const resp = await fetch(API_URL + path, {
          method,
          body: JSON.stringify(body)
        });
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
  }, [path, method, body]);

  return { isLoading, error, data };
};

export default useGetQuery;
