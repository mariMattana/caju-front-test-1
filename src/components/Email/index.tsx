import { useState } from 'react';
import TextField from '~/components/TextField';
import isEmail from 'validator/lib/isEmail';
import { EmailInputProps } from '~/types';

export const EmailInput: React.FC<EmailInputProps> = ({ onChange }) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
    const valid = isEmail(value);
    setIsEmailValid(isEmail(value));
    onChange(value, valid);
  };

  return (
    <>
      <TextField
        placeholder="Email"
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />
      {!isEmailValid && email.length > 0 && (
        <p style={{ margin: '0', color: 'red' }}>Digite um email válido</p>
      )}
    </>
  );
};

export default EmailInput;
