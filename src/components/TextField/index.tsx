import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

type Props = {
  label?: string;
  error?: string;
  valid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = styled.input<{
  valid?: boolean;
}>`
  padding: 0 8px;
  vertical-align: middle;
  border-radius: 2px;
  width: 100%;
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid
    ${props => (props.valid ? 'rgba(36, 28, 21, 0.3)' : '#FF0000')};
  transition: all 0.2s ease-in-out 0s;
  font-size: 16px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    border-color: 1px solid ${props => (props.valid ? '#007c89' : '#FF0000')};
    box-shadow: inset 0 0 0 1px
    outline: none;
      ${props => (props.valid ? '#007c89' : '#FF0000')};
  }
`;

const TextField = (props: Props) => {
  console.log(props);
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <Input {...props} />
      <span style={{ fontSize: 12, color: 'red' }}>{props.error}</span>
    </div>
  );
};

export default TextField;
