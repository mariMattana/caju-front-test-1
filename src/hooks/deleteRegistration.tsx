import { useState, useEffect } from 'react';
import { useMyState } from '~/hooks';
import { REGISTRATION_ID_URL } from '~/constants';

type DeleteRegistrationFn = (registrationId: string) => Promise<void>;

type RequestStatus = 'idle' | 'fetching' | 'fetched' | 'error';

function useDeleteRegistration(): { deleteRegistration: DeleteRegistrationFn } {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const { updateModalState } = useMyState();

  const deleteRegistration: DeleteRegistrationFn = async registrationId => {
    try {
      const response = await fetch(REGISTRATION_ID_URL(registrationId), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete registration with ID ${registrationId}`,
        );
      }

      setStatus('fetched');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setStatus('error');
    }
  };

  useEffect(() => {
    if (status === 'fetched') {
      updateModalState({
        isOpen: true,
        status: 'success',
        message: 'Registro removido com sucesso',
        onClose: () => window.location.reload(),
      });
    } else if (status === 'error') {
      updateModalState({
        isOpen: true,
        status: 'error',
        message: `Erro ao remover registro: ${error}`,
        onClose: undefined,
      });
    }
  }, [status, error, updateModalState]);

  return { deleteRegistration };
}

export default useDeleteRegistration;
