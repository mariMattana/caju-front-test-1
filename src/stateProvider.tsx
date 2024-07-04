import { createContext, useState, useCallback } from 'react';
import { StateType, ModalTypes } from '~/types';

const initialState: StateType = {
  validCpf: false,
  cpf: '',
  modalState: {
    isOpen: false,
    status: 'success',
    message: '',
    onClose: undefined,
  },
};

export const MyStateContext = createContext<{
  state: StateType;
  updateState: React.Dispatch<React.SetStateAction<StateType>>;
  updateModalState: React.Dispatch<React.SetStateAction<ModalTypes>>;
}>({
  state: initialState,
  updateState: () => null,
  updateModalState: () => null,
});

export const MyStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);

  const updateState = useCallback(
    (newState: React.SetStateAction<StateType>) => {
      setState(prevState => ({
        ...prevState,
        ...(typeof newState === 'function' ? newState(prevState) : newState),
      }));
    },
    [],
  );
  const updateModalState = useCallback(
    (newModalState: React.SetStateAction<StateType['modalState']>) => {
      setState(prevState => ({
        ...prevState,
        modalState: {
          ...prevState.modalState,
          ...(typeof newModalState === 'function'
            ? newModalState(prevState.modalState)
            : newModalState),
        },
      }));
    },
    [],
  );

  return (
    <MyStateContext.Provider value={{ state, updateState, updateModalState }}>
      {children}
    </MyStateContext.Provider>
  );
};
