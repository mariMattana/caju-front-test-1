import { useEffect } from 'react';
import Modal from 'react-modal';
import { useMyState } from '~/hooks';
import * as S from './styles';

export const ActionModal = () => {
  const { state, updateModalState } = useMyState();
  const { isOpen, status, message, onClose } = state.modalState;

  useEffect(() => {
    if (isOpen && status === 'success') {
      const timer = setTimeout(() => {
        updateModalState(prevState => ({
          ...prevState,
          isOpen: false,
        }));
        if (onClose) {
          onClose();
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, status, updateModalState, onClose]);

  const closeModal = () => {
    updateModalState(prevState => ({
      ...prevState,
      isOpen: false,
    }));
    if (onClose) {
      onClose();
    }
  };

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
