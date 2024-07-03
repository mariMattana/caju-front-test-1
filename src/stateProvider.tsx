import { createContext, useState } from 'react';
import { StateType } from '~/types';

const initialState: StateType = {
  validCpf: false,
  cpf: '',
};

export const MyStateContext = createContext<{
  state: StateType;
  updateState: React.Dispatch<React.SetStateAction<StateType>>;
}>({
  state: initialState,
  updateState: () => null,
});

export const MyStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);

  const updateState: React.Dispatch<
    React.SetStateAction<StateType>
  > = newState => {
    setState(prevState => ({
      ...prevState,
      ...(typeof newState === 'function' ? newState(prevState) : newState),
    }));
  };

  return (
    <MyStateContext.Provider value={{ state, updateState }}>
      {children}
    </MyStateContext.Provider>
  );
};
