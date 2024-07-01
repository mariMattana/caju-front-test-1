import Columns from './components/Columns';
import * as S from './styles';
import { SearchBar } from './components/Searchbar';
import { useRegistrationFetchData } from '~/hooks';
import { Registration } from '~/types';

const DashboardPage = () => {
  const url = import.meta.env.VITE_REGISTRATION_API_URL;
  const registrationUrl = url + 'registrations/6'

  const { data, status, error } = useRegistrationFetchData(
    registrationUrl,
    'registration_data',
  );

  const registrationData: Registration[] = data && data.length? data : []

  return (
    <S.Container>
      <SearchBar />
      <Columns registrations={registrationData} fetchStatus={status} fetchError={error}/>
    </S.Container>
  );
};
export default DashboardPage;
