import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi'; // Import useAccount from wagmi
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import db from '../data/firebase/firebaseConfig';
import styled from 'styled-components';

import MainContainer from '../shared/components/MainContainer';
import EditProfileModal from '../shared/components/editProfile';

import XIcon from "@mui/icons-material/X";
import Instagram from "@mui/icons-material/Instagram";
import Telegram from "@mui/icons-material/Telegram";


const MyProfile = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [editMode, setEditMode] = useState(false);

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
  }, [isConnected, address, navigate]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <MainContainer>
      <EditButton onClick={toggleEditMode}>Edit Profile</EditButton>
      {editMode && (
        <EditProfileModal isOpen={editMode} onClose={toggleEditMode} address={address} userData={userData} />
      )}
      <BannerDiv>
        <img src={userData.bannerimg} alt="Banner" />
        <SocialMediaIcons>
          {userData.xusername && (
            <a href={`https://x.com/${userData.xusername}`} target="_blank" rel="noopener noreferrer">
              <XIcon />
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
    </MainContainer>
  );
};

export default MyProfile;

const EditButton = styled.button`
  margin-bottom: 10px;
`;

const BannerDiv = styled.div`
  width: 100%;
  position: relative;
  min-height: 200px;
  & img {
    width: 100%;
    display: block;
    border-radius: 20px;
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
  background-color: rgba(0, 0, 0, 0.7);
  padding: 6px 10px;
  border-bottom-right-radius: 20px;
  & a {
    text-decoration: none;
    color: white;
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
  align-items: stretch; // Ensure the children of this container stretch to fill the container's height
`;

const ProfilePicture = styled.div`
  flex-shrink: 0; // Prevent the profile picture from shrinking
  width: 200px; // Fixed width for the profile picture
  height: 200px; // Fixed height to ensure consistency
  & img {
    width: 100%;
    height: 100%; // Make sure the image covers the full size of the container
    object-fit: cover; // Adjust this as needed to maintain the aspect ratio of your images
    border-radius: 10px;
  }
`;



const InfoContainer = styled.div`
  display: flex; // Use flexbox to align items side by side
  justify-content: space-between; // Space between user info and action buttons
  flex-grow: 1;
  background: #222628;
  border-radius: 10px;
  padding: 15px;
  gap: 20px; // Add some space between the two sections
`;

const UserInfo = styled.div`
  & h2 {
    font-size: 29px;
    margin: 0;
  }
  & span {
    font-size: 16px;
    font-weight: 500;
    opacity: 0.5;
  }
  & p {
    margin-top: 15px;
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


