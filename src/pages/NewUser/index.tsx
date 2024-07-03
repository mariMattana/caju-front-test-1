import { useState } from 'react';
import TextField from '~/components/TextField';
import CPFInput from '~/components/Cpf';
import * as S from './styles';
import Button from '~/components/Buttons';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IconButton } from '~/components/Buttons/IconButton';
import { useHistory } from 'react-router-dom';
import routes from '~/constants/routes';
import { useAddRegistration } from '~/hooks';

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const [admissionDate, setAdmissionDate] = useState('');
  const [email, setEmail] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [cpf, setCpf] = useState('');
  const { data, error, loading, postRegistration } = useAddRegistration();

  const handleSubmit = async () => {
    await postRegistration({ admissionDate, email, employeeName, cpf });
    if (data) {
      goToHome();
    }
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          value={employeeName}
          onChange={e => setEmployeeName(e.target.value)}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <CPFInput label="CPF" onChange={e => setCpf(e.target.value)} />
        <TextField
          label="Data de admissão"
          type="date"
          value={admissionDate}
          onChange={e => setAdmissionDate(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
        {error && <p>Error: {error}</p>}
        {data && <p>Registration successful: {JSON.stringify(data)}</p>}
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
