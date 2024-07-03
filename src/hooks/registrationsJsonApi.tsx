import { useState, useEffect } from 'react';
import { Registration } from '~/types';

type RequestStatus = 'idle' | 'fetching' | 'fetched' | 'error';

function useRegistrationFetchData(url: string) {
  const [data, setData] = useState<Registration[]>([]);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [modalStatus, setModalStatus] = useState<'success' | 'error'>(
    'success',
  );

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
        setModalStatus('success');
        setModalMessage('Sucesso');
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          setModalMessage(`Erro: ${err.message}`);
        } else {
          setError('An unknown error occurred');
          setModalMessage('Ocorreu um erro, tente novamente');
        }
        setStatus('error');
        setModalStatus('error');
      } finally {
        setIsModalOpen(true);
      }
    };

    fetchData();
  }, [url]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    data,
    status,
    error,
    setData,
    isModalOpen,
    modalMessage,
    modalStatus,
    closeModal,
  };
}

export default useRegistrationFetchData;
