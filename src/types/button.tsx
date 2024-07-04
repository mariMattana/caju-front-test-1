export interface ButtonProps {
  disabled?: boolean;
}

export type IconButtonProps = {
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;
