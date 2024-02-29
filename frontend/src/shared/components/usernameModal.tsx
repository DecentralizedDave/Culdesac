// Import necessary hooks and styled-components
import { useState } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import db from "../../data/firebase/firebaseConfig";
import { useDisconnect } from "wagmi";
import { COLORS } from "../../shared/constants/colors";

import { Close } from "@mui/icons-material";

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string | undefined;
}

const UsernameModal: React.FC<UsernameModalProps> = ({
  isOpen,
  onClose,
  address,
}) => {
  const [username, setUsername] = useState("");
  const { disconnect } = useDisconnect();
  const handleSave = async () => {
    if (username && address) {
      const docRef = doc(db, "userProfiles", address);
      try {
        // Include profileimg and bannerimg fields with placeholder URLs
        await setDoc(docRef, {
          username,
          address,
          profileimg: "https://i.imgur.com/PFYY60M.png",
          bannerimg: "https://i.imgur.com/yrHJmR5.png",
          favNftCabinet: false,
          musicPlayer: false,
          favCommunityCabinet: false,
          blogCabinet: false,
          interests: "",
          mood: "",
        });
        console.log("Profile created successfully");
        onClose();
      } catch (error) {
        console.error("Error creating profile: ", error);
      }
    }
  };

  // Handle the close action with disconnect logic
  const handleClose = () => {
    disconnect(); // Disconnect the wallet
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={handleClose}>
          <Close />
        </CloseButton>
        <h2>Select a Username</h2>
        <InputDiv>
          <input
            type="text"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))
            }
            placeholder="username"
          />
          <button onClick={handleSave}>Confirm</button>
        </InputDiv>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UsernameModal;

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
