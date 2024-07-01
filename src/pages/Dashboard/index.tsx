import Columns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { useRegistrationFetchData } from '~/hooks';
import { Registration } from '~/types';

const DashboardPage = () => {
  const url = import.meta.env.VITE_REGISTRATION_API_URL;
  const registrationUrl = url + 'registrations'

  const { data, status, error } = useRegistrationFetchData(
    registrationUrl,
    'registration_data',
  );

  const registrationData: Registration[] = data.length? data : []

  return (
    <S.Container>
      <SearchBar />
      {status === 'fetching' && <p>Loading...</p>}
      {status === 'error' && <p>Error: {error}</p>}
      {status === 'fetched' && (
      <Columns registrations={registrationData} />)}
    </S.Container>
  );
};
export default DashboardPage;
