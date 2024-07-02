import * as S from './styles';
import RegistrationCard from '../RegistrationCard';
import { Registration } from '~/types';
import { allColumns } from '~/constants'

type Props = {
  registrations?: Registration[],
  fetchStatus: string,
  fetchError?: string | null
};

const Columns: React.FC<Props> = ({ registrations = [], fetchStatus, fetchError }) => {
  return (
    <S.Container>
      {allColumns.map(column => {
        return (
          <S.Column $status={column.status} key={column.title}>
            <>
              <S.TitleColumn $status={column.status}>
                {column.title}
              </S.TitleColumn>
                {fetchStatus === 'fetched' && ( 
                  <S.ColumnContent>
                    {registrations?.filter(registration => registration.status === column.status)
                      .map((registration: Registration) => {
                      return (
                        <RegistrationCard
                          data={registration}
                          key={registration.id}
                        />
                      );
                    })}
                  </S.ColumnContent>)}
            <>
              {fetchStatus === 'fetching' && <p>Loading...</p>}
            </>
              {fetchStatus === 'error' && <p> Error: {fetchError}</p>}
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
