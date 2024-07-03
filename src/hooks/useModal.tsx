import { useState } from 'react';

type ModalStatus = 'success' | 'error';

const useModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<ModalStatus>('success');
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (status: ModalStatus, message: string) => {
    setModalStatus(status);
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return {
    isModalOpen,
    modalStatus,
    modalMessage,
    openModal,
    closeModal,
  };
};

export default useModal;
