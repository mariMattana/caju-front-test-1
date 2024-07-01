import * as S from './styles';
import RegistrationCard from '../RegistrationCard';
import { Registration } from '~/types';

const allColumns = [
  { status: 'REVIEW', title: 'Pronto para revisar' },
  { status: 'APPROVED', title: 'Aprovado' },
  { status: 'REPROVED', title: 'Reprovado' },
];

type Props = {
  registrations?: Registration[];
};



const Columns = (props: Props) => {
  return (
    <S.Container>
      {allColumns.map(column => {
        return (
          <S.Column $status={column.status} key={column.title}>
            <>
              <S.TitleColumn $status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.ColumnContent>
                {props?.registrations?.filter(registration => registration.status === column.status)
                .map(registration => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  );
                })}
              </S.ColumnContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Columns;
