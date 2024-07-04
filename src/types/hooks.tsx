export type RequestStatus = 'idle' | 'fetching' | 'fetched' | 'error';

export interface RegistrationData {
  admissionDate: string;
  email: string;
  employeeName: string;
  cpf: string;
}

export type DeleteRegistrationFn = (registrationId: string) => Promise<void>;

export type UpdateStatusFn = (
  registrationId: string,
  newStatus: string,
) => Promise<void>;

export type ModalStatus = 'success' | 'error';
