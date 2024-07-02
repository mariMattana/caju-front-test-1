import { RegistrationStatus } from '~/enums';

export const allColumns = [
  { status: RegistrationStatus.REVIEW, title: 'Pronto para revisar' },
  { status: RegistrationStatus.APPROVED, title: 'Aprovado' },
  { status: RegistrationStatus.REPROVED, title: 'Reprovado' },
];
