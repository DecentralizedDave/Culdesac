import React from "react"; // Import React
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import db from "../../../data/firebase/firebaseConfig";
import { COLORS } from "../../../shared/constants/colors";

import { Close, Palette, Public, GraphicEq, Book } from "@mui/icons-material";

interface AddCabinetModalProps {
  userId: string;
  onClose: () => void;
  onProfileUpdate: () => void;
}

const AddCabinetModal: React.FC<AddCabinetModalProps> = ({
  userId,
  onClose,
  onProfileUpdate,
}) => {
  const addCabinet = async (cabinetName: string) => {
    const userRef = doc(db, "userProfiles", userId);
    await setDoc(userRef, { [cabinetName]: true }, { merge: true });
    onClose();
    onProfileUpdate();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        <h2>Add a Cabinet</h2>
        <ButtonDiv>
          <button onClick={() => addCabinet("favNftCabinet")}>
            <Palette style={{ marginRight: "5px" }}/> Favorite NFT
          </button>
          <button onClick={() => addCabinet("favCommunityCabinet")}>
            <Public style={{ marginRight: "5px" }}/> Favorite Community
          </button>
          <button onClick={() => addCabinet("musicPlayer")}>
            <GraphicEq style={{ marginRight: "5px" }}/> Music Player
          </button>
          <button onClick={() => addCabinet("blogCabinet")}>
            <Book style={{ marginRight: "5px" }}/> Blog
          </button>
        </ButtonDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddCabinetModal;

// styles

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
  z-index: 99;
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

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
