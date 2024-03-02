import styled from "styled-components";
import { COLORS } from "../../../../shared/constants/colors";

import { Close } from "@mui/icons-material";

interface RiddleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RiddleModal: React.FC<RiddleModalProps> = ({
  isOpen,
  onClose,
}) => {
  

  // Handle the close action with disconnect logic
  const handleClose = () => {
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={handleClose}>
          <Close />
        </CloseButton>
        <h2>Fill in the blank.</h2>
        <p>ETHDenver 2024 Year of the ________</p>
        <InputDiv>
          <input
            type="text"
            placeholder="answer"
          />
          <button>Submit</button>
        </InputDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RiddleModal;

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${COLORS.black};
`;

const ModalContent = styled.div`
  background: ${COLORS.white};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid ${COLORS.secondary};
  width: 20%;
  max-width: 500px;
  position: relative;
  & h2 {
    color: ${COLORS.black};
    margin-bottom: 15px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  color: ${COLORS.black};
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const InputDiv = styled.div`
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  & input {
    padding: 10px 15px;
    border: none;
    color: ${COLORS.black};
    background: ${COLORS.buttons.secondary};
    border-radius: 10px;
  }
  & button {
    background-color: ${COLORS.buttons.secondary};
    margin: 5px;
    border: none;
    padding: 8px 15px;
    color: ${COLORS.black};
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition 250ms ease-in-out;
    &:hover {
        opacity: 0.8;
    }
  }
`;
