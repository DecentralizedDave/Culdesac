import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import db from "../data/firebase/firebaseConfig";

import MainContainer from "../shared/components/MainContainer";

// icons
import {X, Telegram, Instagram} from "@mui/icons-material";

// import Roof from "../assets/rooftest.svg"

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        // Adjust the query to look for the username field
        const usersRef = collection(db, "userProfiles");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming username is unique, take the first document found
          const userDoc = querySnapshot.docs[0];
          setUserData(userDoc.data());
        } else {
          console.log("No such user!");
        }
      }
    };

    fetchUserData();
  }, [username]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <MainContainer>
      {/* <RoofOverlay src={Roof} /> */}
      <BannerDiv>
        <img
        src={userData.bannerimg}
          alt="Banner"
        />
        <SocialMediaIcons>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X />
          </a>
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
          <a
            href="https://facebook.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram />
          </a>
        </SocialMediaIcons>
      </BannerDiv>
      <TopContainer>
        <ProfilePicture>
          <img src={userData.profileimg} alt="profile picture"/>
        </ProfilePicture>
        <InfoContainer>
        <UserInfo>
          <h2>{userData.username}</h2>
          <span>{userData.address ? formatAddress(userData.address) : 'Loading...'}</span>
          <p>{userData.bio}</p>
        </UserInfo>
        <ActionButtons>
          <ActionButton>Add as Friend</ActionButton>
          <ActionButton>Send Message</ActionButton>
          <ActionButton>Send a Gift</ActionButton>
          <ActionButton>Offer Trade</ActionButton>
          <ActionButton>Block User</ActionButton>
          <ActionButton>Report User</ActionButton>
        </ActionButtons>
        </InfoContainer>
      </TopContainer>
    </MainContainer>
  );
};

export default UserProfile;

// styles

const BannerDiv = styled.div`
  width: 100%;
  position: relative;
  height: 250px; // Adjust this height to fit your design
  overflow: hidden; // This ensures the image doesn't overflow the div size
  & img {
    width: 100%;
    height: 100%; // Make the image fully cover the div height
    display: block;
    border-radius: 20px;
    object-fit: cover; // This makes the image cover the div without distorting its aspect ratio
    object-position: center; // This centers the image within the div
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

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  justify-content: center;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  &:hover {
    opacity: 0.8;
  }
`;

