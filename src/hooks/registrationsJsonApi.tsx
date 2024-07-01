import { useState, useEffect } from 'react';
import { Registration } from '~/types';

type RequestStatus = 'idle' | 'fetching' | 'fetched' | 'error';

function useRegistrationFetchData(url: string, storageKey: string) {
  const [data, setData] = useState<Registration[]>([]);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchData = async () => {
        setStatus('fetching');
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          setData(result);
          localStorage.setItem(storageKey, JSON.stringify(result));
          setStatus('fetched');
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unknown error occurred');
          }
          setStatus('error');
        }
      };

      fetchData();
  }, [url, storageKey]);

  return { data, status, error, setData };
}

export default useRegistrationFetchData;
