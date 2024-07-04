import { ModalTypes } from '~/types';

export interface StateType {
  validCpf: boolean;
  cpf: string;
  modalState: ModalTypes;
}
