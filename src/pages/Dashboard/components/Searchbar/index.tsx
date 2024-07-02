import { HiRefresh } from 'react-icons/hi';
import { useHistory } from 'react-router-dom';
import Button from '~/components/Buttons';
import { IconButton } from '~/components/Buttons/IconButton';
import { routes } from '~/constants';
import CPFInput from '~/components/Cpf';
import * as S from './styles';

export const SearchBar = () => {
  const history = useHistory();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const refetchPage = () => {
    window.location.reload();
  };

  return (
    <S.Container>
      <CPFInput />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={() => refetchPage()}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
