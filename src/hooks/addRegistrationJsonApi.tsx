import { useState } from 'react';

interface FetchOptions {
  method: string;
  headers: {
    'Content-Type': string;
  };
  body?: string;
}

function useAddRegistration<T>(url: string, storageKey: string) {
  const [error, setError] = useState<string | null>(null);

  const addDataApi = async (newData: T) => {
    const fetchOptions: FetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    };

    try {
      const response = await fetch(url, fetchOptions);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      localStorage.setItem(storageKey, JSON.stringify(result));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { addDataApi, error };
}

export default useAddRegistration;
