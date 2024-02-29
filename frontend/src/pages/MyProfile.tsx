import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import db from '../data/firebase/firebaseConfig';
import styled from 'styled-components';
import { COLORS } from '../shared/constants/colors';


import MainContainer from '../shared/components/MainContainer';
import EditProfileModal from '../shared/components/editProfile';
import PoapList from '../shared/components/Cabinets/PoapList';

import {X, Telegram, Instagram} from "@mui/icons-material";


const MyProfile = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      navigate('/'); // Redirect if not connected
    } else if (address) {
      const fetchUserData = async () => {
        const docRef = doc(db, "userProfiles", address);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };
      fetchUserData();
    }
  }, [isConnected, address, navigate, refreshTrigger]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const onProfileUpdate = () => {
    toast.success("Profile updated successfully!"); // Show success toast
    setEditMode(false); // Close the modal
    setRefreshTrigger(!refreshTrigger); // Trigger a refresh
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <MainContainer>
      {editMode && (
        <EditProfileModal isOpen={editMode} onClose={toggleEditMode} address={address} userData={userData} onProfileUpdate={onProfileUpdate} />
      )}
      <BannerDiv>
        <img src={userData.bannerimg} alt="Banner" />
        <EditButton><button onClick={toggleEditMode}>Edit Profile</button></EditButton>
        <SocialMediaIcons style={{ display: (userData.xusername || userData.instagramusername || userData.telegramusername) ? 'flex' : 'none' }}>
          {userData.xusername && (
            <a href={`https://x.com/${userData.xusername}`} target="_blank" rel="noopener noreferrer">
              <X />
            </a>
          )}
          {userData.instagramusername && (
            <a href={`https://instagram.com/${userData.instagramusername}`} target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
          )}
          {userData.telegramusername && (
            <a href={`https://telegram.me/${userData.telegramusername}`} target="_blank" rel="noopener noreferrer">
              <Telegram />
            </a>
          )}
        </SocialMediaIcons>
      </BannerDiv>
      <TopContainer>
      <ProfilePicture>
        <img src={userData.profileimg} alt="Profile" />
      </ProfilePicture>
      <InfoContainer>
        <UserInfo>
          <h2>{userData.username}</h2>
          <span>{userData.address ? formatAddress(userData.address) : 'Loading...'}</span>
          <p>{userData.bio}</p>
        </UserInfo>
        </InfoContainer>
      </TopContainer>
      <PoapList/>
    </MainContainer>
    <ToastContainer position="bottom-right" />
    </>
  );
};

export default MyProfile;

const EditButton = styled.div`
position: absolute;
top: 0px;
right: 0px;
display: flex;
padding: 15px;
align-items: center;
justify-content: center;
& button {
  padding: 8px 15px;
  border: none;
  border-radius: 10px;
  background: ${COLORS.buttons.secondary};
  color: ${COLORS.black};
  opacity: 0.5;
  cursor: pointer;
  transition: 250ms ease-in-out;
  &:hover {
    opacity: 1;
  }
}
`;

const BannerDiv = styled.div`
  width: 100%;
  position: relative;
  height: 250px; 
  overflow: hidden; 
  & img {
    width: 100%;
    height: 100%; 
    display: block;
    border-radius: 20px;
    object-fit: cover; 
    object-position: center;
  }
`;

const SocialMediaIcons = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background: rgba(217, 217, 217, 0.7);
  padding: 6px 10px;
  border-bottom-right-radius: 19px;
  border-top-left-radius: 10px;
  & a {
    text-decoration: none;
    color: ${COLORS.black};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// const RoofOverlay = styled.img`
//   position: absolute;
//   top: 100px; // Adjust this value as needed to get the desired overlap effect
//   left: 50%;
//   transform: translateX(-50%);
//   max-width: 850px; // Adjust width as needed
//   z-index: 20; // Ensure this is above the BannerDiv but consider other elements
// `;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 25px;
  align-items: stretch;
`;

const ProfilePicture = styled.div`
  flex-shrink: 0; 
  width: 200px; 
  height: 200px; 
  & img {
    width: 100%;
    height: 100%; 
    object-fit: cover; 
    border-radius: 10px;
  }
`;



const InfoContainer = styled.div`
  display: flex; 
  justify-content: space-between; 
  flex-grow: 1;
  background: ${COLORS.white};
  border: 1px solid ${COLORS.secondary};
  border-radius: 10px;
  padding: 15px;
  gap: 20px; 
`;

const UserInfo = styled.div`
  & h2 {
    font-size: 29px;
    margin: 0;
    color: ${COLORS.black};
  }
  & span {
    font-size: 16px;
    font-weight: 500;
    color: ${COLORS.secondary};
  }
  & p {
    margin-top: 15px;
    color: ${COLORS.black};
  }
`;

// const ActionButtons = styled.div`
//   display: flex;
//   flex-direction: column; 
//   align-items: flex-start; 
//   justify-content: center;
//   gap: 10px;
// `;

// const ActionButton = styled.button`
//   background: none;
//   border: none;
//   color: white;
//   cursor: pointer;
//   text-decoration: underline;
//   padding: 0;
//   &:hover {
//     opacity: 0.8;
//   }
// `;


