import { InputHTMLAttributes } from 'react';

export type CPFInputProps = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type EmailInputProps = {
  onChange: (value: string, isValid: boolean) => void;
};

export type NameInputProps = {
  onChange: (value: string, isValid: boolean) => void;
};

export type TextProps = {
  label?: string;
  error?: string;
  valid?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
