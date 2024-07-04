import styled from 'styled-components';
import { TextProps } from '~/types';

export const Input = styled.input<{
  $valid?: boolean;
}>`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid
    ${props => (props.$valid ? 'rgba(36, 28, 21, 0.3)' : '#FF0000')};
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid ${props => (props.$valid ? '#007c89' : '#FF0000')};
    box-shadow: inset 0 0 0 1px #007c89;
  }
`;

const TextField = ({
  label,
  error,
  id,
  valid = true,
  ...inputProps
}: TextProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Input {...inputProps} $valid={valid} />
      <span style={{ fontSize: 12, color: 'red' }}>{error}</span>
    </div>
  );
};

export default TextField;
