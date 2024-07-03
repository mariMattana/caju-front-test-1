import { REGISTRATION_ID_URL } from '~/constants';
import { Registration } from '~/types';

type UpdateStatusFn = (
  registrationId: string,
  newStatus: string,
) => Promise<void>;

function useRegistrationUpdate(): { updateRegistrationStatus: UpdateStatusFn } {
  const updateRegistrationStatus: UpdateStatusFn = async (
    registrationId,
    newStatus,
  ) => {
    try {
      const updateUrl = REGISTRATION_ID_URL(registrationId);
      const response = await fetch(updateUrl);
      if (!response.ok) {
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
      console.error('Error updating registration:', error);
    }
  };

  return { updateRegistrationStatus };
}

export default useRegistrationUpdate;
