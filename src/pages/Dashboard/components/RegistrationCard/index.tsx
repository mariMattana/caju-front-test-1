import { ButtonSmall } from '~/components/Buttons';
import * as S from './styles';
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from 'react-icons/hi';
import { Registration } from '~/types';
import { RegistrationStatus } from '~/enums';
import { useRegistrationUpdate } from '~/hooks';
import useDeleteRegistrationRegistration from '~/hooks/deleteRegistration';

type Props = {
  data: Registration;
};

const RegistrationCard: React.FC<Props> = ({ data }) => {
  const { updateRegistrationStatus } = useRegistrationUpdate();
  const { deleteRegistration } = useDeleteRegistrationRegistration();

  const handleStatusChange = async (
    registrationId: string,
    newStatus: string,
  ) => {
    try {
      await updateRegistrationStatus(registrationId, newStatus);
    } catch (error) {
      console.error('Failed to update registration status:', error);
    }
  };

  const handleDelete = (id: string) => {
    deleteRegistration(id);
    window.location.reload();
  };

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {data.status === 'REVIEW' && (
          <>
            <ButtonSmall
              $bgcolor="rgb(255, 145, 154)"
              onClick={() =>
                handleStatusChange(data.id, RegistrationStatus.REPROVED)
              }
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              $bgcolor="rgb(155, 229, 155)"
              onClick={() =>
                handleStatusChange(data.id, RegistrationStatus.APPROVED)
              }
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {(data.status === 'REPROVED' || data.status === 'APPROVED') && (
          <ButtonSmall
            $bgcolor="#ff8858"
            onClick={() =>
              handleStatusChange(data.id, RegistrationStatus.REVIEW)
            }
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash onClick={() => handleDelete(data.id)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
