// Import necessary hooks and styled-components
import { useState } from 'react';
import styled from 'styled-components';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../data/firebase/firebaseConfig';
import { useDisconnect } from 'wagmi'; // Import useDisconnect

interface UsernameModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string | undefined;
}

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
`;

const ModalContent = styled.div`
  background: black;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const UsernameModal: React.FC<UsernameModalProps> = ({ isOpen, onClose, address }) => {
  const [username, setUsername] = useState('');
  const { disconnect } = useDisconnect(); // Use the useDisconnect hook

  const handleSave = async () => {
    if (username && address) {
      const docRef = doc(db, "userProfiles", address);
      try {
        await setDoc(docRef, { username });
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
        <CloseButton onClick={handleClose}>X</CloseButton>
        <h2>Mint a Username</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button onClick={handleSave}>Mint</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UsernameModal;


