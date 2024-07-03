import { useState } from 'react';
import TextField from '~/components/TextField';
import { formatCPF, validateCPF } from '~/utils';
import { useMyState } from '~/hooks';

type CPFInputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const CPFInput: React.FC<CPFInputProps> = ({ label }) => {
  const [cpf, setCPF] = useState('');
  const [isValid, setIsValid] = useState(true);
  const { updateState } = useMyState();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const formattedCPF = formatCPF(value);
    setCPF(formattedCPF);
    const hasValidLength =
      value.length === 0 ||
      value.replace(/\D/g, '').slice(0, 11).trim().length === 11;
    const newIsValid = hasValidLength && validateCPF(formattedCPF);
    setIsValid(newIsValid);
    updateState(prevState => ({
      ...prevState,
      validCpf: newIsValid,
      cpf: formattedCPF,
    }));
  };

  return (
    <div>
      <TextField
        type="text"
        placeholder="Digite um CPF válido"
        value={cpf}
        onChange={handleChange}
        valid={isValid}
        label={label}
      />
      {!isValid && <p style={{ color: 'red' }}>CPF Inválido</p>}
    </div>
  );
};

export default CPFInput;
