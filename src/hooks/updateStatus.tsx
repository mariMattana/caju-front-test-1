import { useState, useEffect } from 'react';
import { useMyState } from '~/hooks';
import { REGISTRATION_ID_URL } from '~/constants';
import { Registration } from '~/types';

type UpdateStatusFn = (
  registrationId: string,
  newStatus: string,
) => Promise<void>;

type RequestStatus = 'idle' | 'fetching' | 'fetched' | 'error';

function useRegistrationUpdate(): { updateRegistrationStatus: UpdateStatusFn } {
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const { updateModalState } = useMyState();

  const updateRegistrationStatus: UpdateStatusFn = async (
    registrationId,
    newStatus,
  ) => {
    try {
      const updateUrl = REGISTRATION_ID_URL(registrationId);
      const response = await fetch(updateUrl);
      setStatus('fetched');
      if (!response.ok) {
        setStatus('error');
        throw new Error(
          `Failed to fetch registration with ID ${registrationId}`,
        );
      }
      const registration: Registration = await response.json();

      registration.status = newStatus;

      const updateResponse = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registration),
      });

      if (!updateResponse.ok) {
        throw new Error(
          `Failed to update registration with ID ${registrationId}`,
        );
      }
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
        message: 'Dados atualizados com sucesso',
        onClose: () => window.location.reload(),
      });
    } else if (status === 'error') {
      updateModalState({
        isOpen: true,
        status: 'error',
        message: `Erro ao atualizar dados: ${error}`,
        onClose: undefined,
      });
    }
  }, [status, error, updateModalState]);

  return { updateRegistrationStatus };
}

export default useRegistrationUpdate;
