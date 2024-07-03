import { useContext } from 'react';
import { MyStateContext } from '~/stateProvider';

const useMyState = () => {
  const context = useContext(MyStateContext);
  if (!context) {
    throw new Error('useMyState must be used within a MyStateProvider');
  }
  return context;
};

export default useMyState;
