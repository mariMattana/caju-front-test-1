import { Registration } from '~/types';

export type Column = {
  registrations?: Registration[];
  fetchStatus: string;
  fetchError?: string | null;
};

export type RegistrationCardType = {
  data: Registration;
};
