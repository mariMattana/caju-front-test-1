import { useState, useEffect } from 'react';
import TextField from '~/components/TextField';
import CPFInput from '~/components/Cpf';
import EmailInput from '~/components/Email';
import * as S from './styles';
import Button from '~/components/Buttons';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IconButton } from '~/components/Buttons/IconButton';
import { useHistory } from 'react-router-dom';
import routes from '~/constants/routes';
import { useAddRegistration, useMyState } from '~/hooks';

const NewUserPage = () => {
  const history = useHistory();
  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const [admissionDate, setAdmissionDate] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [employeeName, setEmployeeName] = useState('');
  const { data, error, loading, postRegistration } = useAddRegistration();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { state, updateState } = useMyState();
  const cpf = state.cpf;
  console.log(isButtonDisabled);
  console.log('isEmailValid', isEmailValid);
  console.log('admissionDate', admissionDate);
  console.log('employeeName', employeeName);
  console.log('cpf', state.validCpf);

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    setIsEmailValid(isValid);
  };

  const handleSubmit = async () => {
    try {
      await postRegistration({ admissionDate, email, employeeName, cpf });
      updateState(prevState => ({
        ...prevState,
        validCpf: false,
        cpf: '',
      }));
      goToHome();
    } catch (err) {
      console.error('Error registering:', err);
    }
  };

  useEffect(() => {
    setIsButtonDisabled(
      !isEmailValid || !admissionDate || !employeeName || !state.validCpf,
    );
  }, [isEmailValid, admissionDate, employeeName, state]);

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
        <EmailInput onChange={handleEmailChange} />
        <CPFInput label="CPF" />
        <TextField
          label="Data de admissão"
          type="date"
          value={admissionDate}
          onChange={e => setAdmissionDate(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={isButtonDisabled}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
        {error && <p>Error: {error}</p>}
        {data && <p>Registration successful: {JSON.stringify(data)}</p>}
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
