export interface ModalTypes {
  isOpen: boolean;
  status: 'success' | 'error';
  message: string;
  onClose?: () => void;
}
