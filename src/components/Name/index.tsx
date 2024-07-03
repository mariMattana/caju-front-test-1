import { useState } from 'react';
import TextField from '~/components/TextField';
import { validateFullName } from '~/utils';

type NameInputProps = {
  onChange: (value: string, isValid: boolean) => void;
};

export const FullNameInput: React.FC<NameInputProps> = ({ onChange }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmployeeName(value);
    const { valid, error } = validateFullName(value);
    if (!valid) {
      setError(error);
    } else {
      setError('');
    }
    onChange(value, valid);
  };

  return (
    <>
      <TextField
        placeholder="Nome"
        label="Nome"
        value={employeeName}
        onChange={handleNameChange}
      />
      {error && employeeName.length > 0 && (
        <p style={{ margin: '0', color: 'red' }}>{error}</p>
      )}
    </>
  );
};

export default FullNameInput;
