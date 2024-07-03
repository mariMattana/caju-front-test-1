export const baseUrl = import.meta.env.VITE_REGISTRATION_API_URL;

const routes = {
  identify: '/identify',
  dashboard: '/dashboard',
  history: '/history',
  newUser: '/new-user',
  registrations: '/registrations',
};

export default routes;

export const REGISTRATION_URL = `${baseUrl}/registrations`;
export const REGISTRATION_ID_URL = (registrationId: string): string => {
  return `${REGISTRATION_URL}/${registrationId}`;
};
