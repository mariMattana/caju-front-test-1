import styled from 'styled-components';

export const modalStyles = {
  content: {
    top: '10%',
    left: '50%',
    right: 'auto',
    width: '250px',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 16px;
  }

  button {
    padding: 8px 16px;
    margin: 0 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
