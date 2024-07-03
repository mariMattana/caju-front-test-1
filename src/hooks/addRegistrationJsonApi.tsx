import { useState } from 'react';
import { Registration } from '~/types';
import { REGISTRATION_URL } from '~/constants';

interface RegistrationData {
  admissionDate: string;
  email: string;
  employeeName: string;
  cpf: string;
}

const useAddRegistration = () => {
  const [data, setData] = useState<Registration | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postRegistration };
};

export default useAddRegistration;
