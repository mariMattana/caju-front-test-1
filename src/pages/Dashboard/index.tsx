import { useState, useEffect } from 'react';
import Columns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { ActionModal } from '~/components/Modal';
import { useRegistrationFetchData, useMyState } from '~/hooks';
import { REGISTRATION_URL } from '~/constants';
import { Registration } from '~/types';

const DashboardPage = () => {
  const initialDashboardUrl = REGISTRATION_URL;
  const [registrationUrl, setRegistrationUrl] =
    useState<string>(initialDashboardUrl);

  const { state } = useMyState();
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

  useEffect(() => {
    if (state.cpf && state.validCpf) {
      const formattedCpf = state.cpf.replace(/\D/g, '').slice(0, 11).trim();
      setRegistrationUrl(`${initialDashboardUrl}?cpf=${formattedCpf}`);
    } else if (state.cpf === '') {
      setRegistrationUrl(initialDashboardUrl);
    }
  }, [state, initialDashboardUrl]);

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
