import { useState } from 'react';
import TextField from '~/components/TextField';
import { formatCPF, validateCPF } from '~/utils';

const CPFInput: React.FC = () => {
  const [cpf, setCPF] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log('value: ', value);
    const formattedCPF = formatCPF(value);
    setCPF(formattedCPF);
    if (formattedCPF.trim() === '') {
      setIsValid(true);
    } else {
      setIsValid(validateCPF(formattedCPF));
    }
  };

  return (
    <div>
      <TextField
        type="text"
        placeholder="Digite um CPF válido"
        value={cpf}
        onChange={handleChange}
        valid={isValid}
      />
      {!isValid && <p style={{ color: 'red' }}>CPF Inválido</p>}
    </div>
  );
};

export default CPFInput;
