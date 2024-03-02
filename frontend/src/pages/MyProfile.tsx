import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import db from "../data/firebase/firebaseConfig";
import styled from "styled-components";
import { COLORS } from "../shared/constants/colors";

// components
import MainContainer from "../shared/components/MainContainer";
import EditProfileModal from "../shared/components/editProfile";
import {Messageboard} from "../shared/components/Profile/AboutMe";
import PoapList from "../shared/components/Cabinets/PoapList";

// Cabinet Components
import AddCabinet from "../shared/components/Cabinets/AddCabinet";
import AddCabinetModal from "../shared/components/Cabinets/AddCabinetModal";
import FavoriteNftCabinet from "../shared/components/Cabinets/favoriteNftCabinet";
import MusicPlayerCabinet from "../shared/components/Cabinets/musicPlayerCabinet";
import FavCommunity from "../shared/components/Cabinets/favoriteCommunityCabinet";
import UserBlogCabinet from "../shared/components/Cabinets/UserBlogCabinet";
import WarpCastCabinet from "../shared/components/Cabinets/warpcastCabinet";

import { X, Telegram, Instagram } from "@mui/icons-material";

const MyProfile = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState<DocumentData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [showAddCabinetModal, setShowAddCabinetModal] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      navigate("/"); 
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

  const toggleAddCabinetModal = () => {
    setShowAddCabinetModal(!showAddCabinetModal);
  };

  return (
    <>
      <MainContainer>
        {editMode && (
          <EditProfileModal
            isOpen={editMode}
            onClose={toggleEditMode}
            address={address}
            userData={userData}
            onProfileUpdate={onProfileUpdate}
          />
        )}
        {showAddCabinetModal && address && (
          <AddCabinetModal userId={address} onClose={toggleAddCabinetModal}  onProfileUpdate={onProfileUpdate} />
        )}
        <BannerDiv>
          <img src={userData.bannerimg} alt="Banner" />
          <EditButton>
            <button onClick={toggleEditMode}>Edit Profile</button>
          </EditButton>
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
            <img src={userData.profileimg} alt="Profile" />
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
              <Mood>Mood: {userData.mood}</Mood>
            </UserInfo>
          </InfoContainer>
        </TopContainer>
        <Messageboard aboutme={userData.aboutme || "Nothing here yet"} interests={userData.interests || "Nothing here yet"} />
        {userData && <PoapList address={userData.address} />}
        
        {/* // Cabinets */}
        {userData.warpcastCabinet && <WarpCastCabinet address={userData.address} />}
        {userData.favNftCabinet && <FavoriteNftCabinet address={userData.address} />}
        {userData.blogCabinet && <UserBlogCabinet address={userData.address} />}
        {userData.musicPlayer && <MusicPlayerCabinet address={userData.address} />}
        {userData.favCommunityCabinet && <FavCommunity address={userData.address} />}
        <AddCabinet onAddCabinetClick={toggleAddCabinetModal} />

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
    margin-bottom: 25px;
    color: ${COLORS.black};
  }
`;

const Mood = styled.span`
  color: ${COLORS.success} !important;
  font-weight: 600 !important;
`