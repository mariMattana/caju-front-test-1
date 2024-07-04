import { useState, useEffect } from 'react';
import { useMyState } from '~/hooks';
import { Registration } from '~/types';

type RequestStatus = 'idle' | 'fetching' | 'fetched' | 'error';

function useRegistrationFetchData(url: string) {
  const [data, setData] = useState<Registration[]>([]);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const { updateModalState } = useMyState();

  useEffect(() => {
    const fetchData = async () => {
      setStatus('fetching');
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const dataArray = Array.isArray(result) ? result : [result];
        setData(dataArray);
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
  }, [url]);

  useEffect(() => {
    if (status === 'fetched') {
      updateModalState({
        isOpen: true,
        status: 'success',
        message: 'Dados carregados com sucesso',
      });
    } else if (status === 'error') {
      updateModalState({
        isOpen: true,
        status: 'error',
        message: `Erro ao carregar dados: ${error}`,
      });
    }
  }, [status, error, updateModalState]);

  return {
    data,
    status,
    error,
  };
}

export default useRegistrationFetchData;
