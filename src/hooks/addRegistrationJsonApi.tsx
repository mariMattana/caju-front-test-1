import { useState, useEffect } from 'react';
import { useMyState } from '~/hooks';
import { Registration } from '~/types';
import { REGISTRATION_URL } from '~/constants';
import { useHistory } from 'react-router-dom';
import routes from '~/constants/routes';

interface RegistrationData {
  admissionDate: string;
  email: string;
  employeeName: string;
  cpf: string;
}

type RequestStatus = 'idle' | 'fetching' | 'fetched' | 'error';

const useAddRegistration = () => {
  const [data, setData] = useState<Registration | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<RequestStatus>('idle');
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };
  const { updateModalState } = useMyState();

  const postRegistration = async (registrationData: RegistrationData) => {
    setLoading(true);
    setError(null);

    const payload = {
      ...registrationData,
      status: 'REVIEW',
    };

    try {
      const response = await fetch(REGISTRATION_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: Registration = await response.json();
      setData(result);
      setStatus('fetched');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'fetched') {
      updateModalState({
        isOpen: true,
        status: 'success',
        message: 'Registro adicionado com sucesso',
        onClose: goToHome,
      });
    } else if (status === 'error') {
      updateModalState({
        isOpen: true,
        status: 'error',
        message: `Erro ao adicionar registro: ${error}`,
        onClose: undefined,
      });
    }
  }, [status, error, updateModalState]);

  return { data, error, loading, postRegistration };
};

export default useAddRegistration;
