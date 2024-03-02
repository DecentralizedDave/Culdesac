import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import db from "../../data/firebase/firebaseConfig";
import Moralis from "moralis";
import { initializeMoralis } from "../../utils/initializeMoralis";
import { useAccount } from "wagmi";
import { COLORS } from "../../shared/constants/colors";

import {
  Close,
  ArrowBackIos,
  Add,
  Feed,
  X,
  Telegram,
  Instagram,
  Mood,
  Interests,
  Info,
} from "@mui/icons-material";

interface ImagePreviewProps {
  isBanner?: boolean;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string | undefined;
  onProfileUpdate: () => void;
  userData: {
    profileimg?: string;
    bannerimg?: string;
    bio?: string;
    xusername?: string;
    instagramusername?: string;
    telegramusername?: string;
    aboutme?: string;
    interests?: string;
    mood?: string;
  };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  address,
  userData,
  onProfileUpdate,
}) => {
  const [showProfileNFTSelection, setShowProfileNFTSelection] = useState(false);
  const [showBannerNFTSelection, setShowBannerNFTSelection] = useState(false);
  const [selectedProfileImg, setSelectedProfileImg] = useState(
    userData.profileimg || ""
  );
  const [selectedBannerImg, setSelectedBannerImg] = useState(
    userData.bannerimg || ""
  );
  const [nfts, setNfts] = useState<any[]>([]);
  const [instagramUsername, setInstagramUsername] = useState(
    userData.instagramusername || ""
  );
  const [telegramUsername, setTelegramUsername] = useState(
    userData.telegramusername || ""
  );
  const [xUsername, setxUsername] = useState(userData.xusername || "");
  const [myBio, setmyBio] = useState(userData.bio || "");
  const [myMood, setmyMood] = useState(userData.mood || "");
  const [myAboutMe, setMyAboutMe] = useState(userData.aboutme || "");
  const [myInterests, setMyInterests] = useState(userData.interests || "");

  const { address: userAddy } = useAccount();

  useEffect(() => {
    const fetchNFTs = async () => {
      if (
        address &&
        isOpen &&
        (showProfileNFTSelection || showBannerNFTSelection)
      ) {
        await initializeMoralis();
        try {
          const response = await Moralis.EvmApi.nft.getWalletNFTs({
            chain: "0x1",
            format: "decimal",
            mediaItems: true,
            address: userAddy,
          });
          setNfts(response.result);
          console.log(response.result);
          console.log(response.result[1].media?.originalMediaUrl);
        } catch (error) {
          console.error("Error fetching NFTs:", error);
        }
      }
    };

    if (showProfileNFTSelection || showBannerNFTSelection) {
      fetchNFTs();
    }
  }, [address, isOpen, showProfileNFTSelection, showBannerNFTSelection]);

  const handleSave = async () => {
    if (address) {
      const docRef = doc(db, "userProfiles", address);
      try {
        await setDoc(
          docRef,
          {
            profileimg: selectedProfileImg,
            bannerimg: selectedBannerImg,
            bio: myBio,
            xusername: xUsername,
            instagramusername: instagramUsername,
            telegramusername: telegramUsername,
            mood: myMood,
            aboutme: myAboutMe,
            interests: myInterests,
          },
          { merge: true }
        );
        console.log("Profile updated successfully");
        onClose();
        onProfileUpdate();
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    }
  };

  const selectNFT = (imageUrl: string, type: "profile" | "banner") => {
    if (type === "profile") {
      setSelectedProfileImg(imageUrl);
      setShowProfileNFTSelection(false);
    } else {
      setSelectedBannerImg(imageUrl);
      setShowBannerNFTSelection(false);
    }
    // Add this to return to the main modal view
    setShowProfileNFTSelection(false);
    setShowBannerNFTSelection(false);
  };

  if (!isOpen) return null;

  const convertIpfsUrl = (ipfsUrl: string) => {
    const ipfsPrefix = "ipfs://";
    if (ipfsUrl.startsWith(ipfsPrefix)) {
      return ipfsUrl.replace(ipfsPrefix, "https://cloudflare-ipfs.com/ipfs/");
    }
    return ipfsUrl;
  };

  const PlaceholderImage = "https://place-hold.it/100x100/white";

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <Close />
        </CloseButton>
        {showProfileNFTSelection || showBannerNFTSelection ? (
          <>
            <BackButton
              onClick={() => {
                setShowProfileNFTSelection(false);
                setShowBannerNFTSelection(false);
              }}
            >
              <ArrowBackIos />
            </BackButton>
            <h2>Select Your NFT</h2>
            {nfts.length > 0 ? (
              <NFTGrid>
                {nfts
                  .filter(
                    (nft) => nft.media?.originalMediaUrl && !nft.possibleScam
                  )
                  .map((nft, index) => {
                    const imageUrl = convertIpfsUrl(
                      nft.media?.originalMediaUrl
                    );

                    return (
                      <NFTThumbnail
                        key={index}
                        onClick={() =>
                          selectNFT(
                            imageUrl,
                            showProfileNFTSelection ? "profile" : "banner"
                          )
                        }
                      >
                        <img
                          src={imageUrl}
                          alt={`NFT ${index}`}
                          onError={(e) =>
                            (e.currentTarget.src = PlaceholderImage)
                          }
                        />
                      </NFTThumbnail>
                    );
                  })}
              </NFTGrid>
            ) : (
              <p style={{color: "black"}}>You don't own any NFTs.</p>
            )}
          </>
        ) : (
          <EditDiv>
            <h2>Edit Profile</h2>
            <Button onClick={() => setShowProfileNFTSelection(true)}>
              <Add /> Select Profile NFT
            </Button>
            <ImagePreviewContainer>
              <ImagePreview
                src={selectedProfileImg || PlaceholderImage}
                alt="Profile Image"
              />
            </ImagePreviewContainer>
            <Button onClick={() => setShowBannerNFTSelection(true)}>
              <Add /> Select Banner NFT
            </Button>
            <ImagePreviewContainer>
              <ImagePreview
                isBanner={true}
                src={selectedBannerImg || PlaceholderImage}
                alt="Banner Image"
              />
            </ImagePreviewContainer>
            <InputDiv>
              <Feed />
              <input
                type="text"
                value={myBio}
                onChange={(e) => setmyBio(e.target.value)}
                placeholder="Bio"
                maxLength={30}
              />
            </InputDiv>
            <InputDiv>
              <Mood />
              <input
                type="text"
                value={myMood}
                onChange={(e) => setmyMood(e.target.value)}
                placeholder="Mood"
                maxLength={10}
              />
            </InputDiv>
            <InputDiv>
              <Info />
              <input
                type="text"
                value={myAboutMe}
                onChange={(e) => setMyAboutMe(e.target.value)}
                placeholder="About Me"
                maxLength={300}
              />
            </InputDiv>
            <InputDiv>
              <Interests />
              <input
                type="text"
                value={myInterests}
                onChange={(e) => setMyInterests(e.target.value)}
                placeholder="My Interests"
                maxLength={200}
              />
            </InputDiv>
            <InputDiv>
              <X />
              <input
                type="text"
                value={xUsername}
                onChange={(e) => setxUsername(e.target.value)}
                placeholder="X Username"
              />
            </InputDiv>

            <InputDiv>
              <Instagram />
              <input
                type="text"
                value={instagramUsername}
                onChange={(e) => setInstagramUsername(e.target.value)}
                placeholder="Instagram Username"
              />
            </InputDiv>

            <InputDiv>
              <Telegram />
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="Telegram Username"
              />
            </InputDiv>

            <SaveButton onClick={handleSave}>Save</SaveButton>
          </EditDiv>
        )}
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
  background: ${COLORS.white};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid ${COLORS.secondary};
  width: 90%;
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

const Button = styled.button`
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
`;

const EditDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & div {
  }
`;

const NFTGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 20px;
  height: 400px; /* Adjust based on your needs */
  overflow-y: auto;
`;

const NFTThumbnail = styled.div`
  cursor: pointer;
  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const ImagePreview = styled.img<ImagePreviewProps>`
  width: ${({ isBanner }) => (isBanner ? "150px" : "100px")};
  height: ${({ isBanner }) => (isBanner ? "50px" : "100px")};
  object-fit: cover;
  border-radius: 10px;
`;

const SaveButton = styled.button`
background-color: ${COLORS.buttons.primary};
margin: 5px;
border: none;
padding: 10px 25px;
color: ${COLORS.white};
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
`;

const BackButton = styled.button`
  margin-bottom: 20px;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  color: ${COLORS.black};
  align-items: center;
  cursor: pointer;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${COLORS.black};
  margin-bottom: 10px;
  & input {
    padding: 10px 15px;
    border: none;
    color: ${COLORS.black};
    background: ${COLORS.buttons.secondary};
    border-radius: 10px;
  }
`;
