import { REGISTRATION_ID_URL } from '~/constants';

type DeleteRegistrationFn = (registrationId: string) => Promise<void>;

function useDeleteRegistration(): { deleteRegistration: DeleteRegistrationFn } {
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

      console.log('Registro deletado com sucesso');
    } catch (error) {
      console.error('Ocorreu um erro, tente novamente');
    }
  };

  return { deleteRegistration };
}

export default useDeleteRegistration;
