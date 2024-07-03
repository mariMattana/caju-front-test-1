import Columns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { ActionModal } from '~/components/Modal';
import { useRegistrationFetchData } from '~/hooks';
import { routes, baseUrl } from '~/constants';
import { Registration } from '~/types';

const DashboardPage = () => {
  const registrationUrl = baseUrl + routes.registrations;

  const {
    data,
    status,
    error,
    isModalOpen,
    modalMessage,
    modalStatus,
    closeModal,
  } = useRegistrationFetchData(registrationUrl);

  const registrationData: Registration[] = data && data.length ? data : [];

  return (
    <S.Container>
      <SearchBar />
      <Columns
        registrations={registrationData}
        fetchStatus={status}
        fetchError={error}
      />
      <ActionModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        status={modalStatus}
        message={modalMessage}
      />
    </S.Container>
  );
};
export default DashboardPage;
