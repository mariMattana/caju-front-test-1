import { useEffect } from 'react';
import Modal from 'react-modal';
import { ModalTypes } from '~/types';
import * as S from './styles';

export const ActionModal: React.FC<ModalTypes> = ({
  isOpen,
  closeModal,
  status,
  message,
}) => {
  useEffect(() => {
    if (isOpen && status === 'success') {
      const timer = setTimeout(() => {
        closeModal();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, status, closeModal]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      ariaHideApp={false}
      style={S.modalStyles}
    >
      <S.ModalContent>
        <h2>{message}</h2>
        <div>
          {status === 'success' && (
            <button onClick={closeModal}>Confirmar</button>
          )}
          <button onClick={closeModal}>Fechar</button>
        </div>
      </S.ModalContent>
    </Modal>
  );
};
