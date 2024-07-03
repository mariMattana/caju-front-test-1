export interface ModalTypes {
  isOpen: boolean;
  closeModal: () => void;
  status: 'success' | 'error';
  message: string;
}
