// Import necessary hooks and styled-components
import { useState } from 'react';
import styled from 'styled-components';
import { doc, setDoc } from 'firebase/firestore';
import db from '../../data/firebase/firebaseConfig';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string | undefined;
  userData: { 
    profileimg?: string;
    bannerimg?: string;
    bio?: string;
    xusername?: string;
    instagramusername?: string;
    telegramusername?: string;
  };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, address, userData }) => {
    const [profileImg, setProfileImg] = useState(userData.profileimg || '');
    const [bannerImg, setBannerImg] = useState(userData.bannerimg || '');
    const [instagramUsername, setInstagramUsername] = useState(userData.instagramusername || '');
    const [telegramUsername, setTelegramUsername] = useState(userData.telegramusername || '');
    const [xUsername, setxUsername] = useState(userData.xusername || '');
    const [myBio, setmyBio] = useState(userData.bio || '');

  const handleSave = async () => {
    if (address) {
      const docRef = doc(db, "userProfiles", address);
      try {
        await setDoc(docRef, { 
          profileimg: profileImg || "https://thumbs2.imgbox.com/0e/65/iUW18SaA_t.png",
          bannerimg: bannerImg || "https://i.imgur.com/LMIT3hC.png",
          bio: myBio,
          xusername: xUsername,
          instagramusername: instagramUsername,
          telegramusername: telegramUsername,
        }, { merge: true }); // Use merge option to update existing fields or create new ones
        console.log("Profile updated successfully");
        onClose(); 
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  // Handle the close action with disconnect logic
  const handleClose = () => {
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={handleClose}>X</CloseButton>
        <h2>Edit Profile</h2>
        <input
          type="text"
          value={profileImg}
          onChange={(e) => setProfileImg(e.target.value)}
          placeholder="Profile Image URL"
        />
        <input
          type="text"
          value={bannerImg}
          onChange={(e) => setBannerImg(e.target.value)}
          placeholder="Banner Image URL"
        />
        <input
          type="text"
          value={myBio}
          onChange={(e) => setmyBio(e.target.value)}
          placeholder="Bio"
        />
        <input
          type="text"
          value={xUsername}
          onChange={(e) => setxUsername(e.target.value)}
          placeholder="X Username"
        />
        <input
          type="text"
          value={instagramUsername}
          onChange={(e) => setInstagramUsername(e.target.value)}
          placeholder="Instagram Username"
        />
        <input
          type="text"
          value={telegramUsername}
          onChange={(e) => setTelegramUsername(e.target.value)}
          placeholder="Telegram Username"
        />
        <button onClick={handleSave}>Save</button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditProfileModal;

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
  z-index: 99;
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
