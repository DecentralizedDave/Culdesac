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
import { COLORS } from "../shared/constants/colors";

import MainContainer from "../shared/components/MainContainer";
import PoapList from "../shared/components/Cabinets/PoapList";
import FavoriteNftCabinet from "../shared/components/Cabinets/favoriteNftCabinet";
import MusicPlayerCabinet from "../shared/components/Cabinets/musicPlayerCabinet";
import FavCommunity from "../shared/components/Cabinets/favoriteCommunityCabinet";
import UserBlogCabinet from "../shared/components/Cabinets/UserBlogCabinet";
import GossipCabinet from "../shared/components/Cabinets/GossipCabinet";

// icons
import { X, Telegram, Instagram } from "@mui/icons-material";

// import Roof from "../assets/rooftest.svg"

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        const usersRef = collection(db, "userProfiles");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
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
        <img src={userData.bannerimg} alt="Banner" />
        <SocialMediaIcons
          style={{
            display:
              userData.xusername ||
              userData.instagramusername ||
              userData.telegramusername
                ? "flex"
                : "none",
          }}
        >
          {userData.xusername && (
            <a
              href={`https://x.com/${userData.xusername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <X />
            </a>
          )}
          {userData.instagramusername && (
            <a
              href={`https://instagram.com/${userData.instagramusername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram />
            </a>
          )}
          {userData.telegramusername && (
            <a
              href={`https://telegram.me/${userData.telegramusername}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Telegram />
            </a>
          )}
        </SocialMediaIcons>
      </BannerDiv>
      <TopContainer>
        <ProfilePicture>
          <img src={userData.profileimg} alt="profile picture" />
        </ProfilePicture>
        <InfoContainer>
          <UserInfo>
            <h2>{userData.username}</h2>
            <span>
              {userData.address
                ? formatAddress(userData.address)
                : "Loading..."}
            </span>
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
      {userData.hiddenComments && (
        <GossipCabinet address={userData.address} />
      )}
      {userData && <PoapList address={userData.address} />}
      {userData.favNftCabinet && (
        <FavoriteNftCabinet address={userData.address} />
      )}
      {userData.musicPlayer && (
        <MusicPlayerCabinet address={userData.address} />
      )}
      {userData.favCommunityCabinet && (
        <FavCommunity address={userData.address} />
      )}
      {userData.blogCabinet && <UserBlogCabinet address={userData.address} />}
    </MainContainer>
  );
};

export default UserProfile;

// styles

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
  color: ${COLORS.black};
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  &:hover {
    opacity: 0.8;
  }
`;
