import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { doc, setDoc } from "firebase/firestore";
import db from "../../data/firebase/firebaseConfig";
import Moralis from "moralis";
import { initializeMoralis } from "../../utils/initializeMoralis";

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
  };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  address,
  userData,
  onProfileUpdate
}) => {
  const [nfts, setNfts] = useState<any[]>([]);
  const [showNFTSelection, setShowNFTSelection] = useState(false);
  const [bannerImg, setBannerImg] = useState(userData.bannerimg || "");
  const [instagramUsername, setInstagramUsername] = useState(
    userData.instagramusername || ""
  );
  const [telegramUsername, setTelegramUsername] = useState(
    userData.telegramusername || ""
  );
  const [xUsername, setxUsername] = useState(userData.xusername || "");
  const [myBio, setmyBio] = useState(userData.bio || "");

  useEffect(() => {
    const fetchNFTs = async () => {
      if (address && isOpen) {
        await initializeMoralis();
        try {
          const response = await Moralis.EvmApi.nft.getWalletNFTs({
            chain: "0x1",
            format: "decimal",
            mediaItems: true,
            address: "0x15E038B0Aa5B0b53c53a9F4c45f8A803f5E2AE2C",
          });
          setNfts(response.result);
          console.log(response.result);
          console.log(response.result[1].media?.originalMediaUrl);
        } catch (error) {
          console.error("Error fetching NFTs:", error);
        }
      }
    };

    if (showNFTSelection) {
      fetchNFTs();
    }
  }, [address, isOpen, showNFTSelection]);
  

  const handleSave = async (profileImg: string) => {
    if (address) {
      const docRef = doc(db, "userProfiles", address);
      try {
        await setDoc(
          docRef,
          {
            profileimg: profileImg,
            bannerimg: bannerImg,
            bio: myBio,
            xusername: xUsername,
            instagramusername: instagramUsername,
            telegramusername: telegramUsername,
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

  const selectNFT = (imageUrl: string) => {
    handleSave(imageUrl);
    setShowNFTSelection(false);
  };

  if (!isOpen) return null;

  const convertIpfsUrl = (ipfsUrl: string) => {
    const ipfsPrefix = "ipfs://";
    if (ipfsUrl.startsWith(ipfsPrefix)) {
      // Using Cloudflare's IPFS gateway but you can choose another one
      return ipfsUrl.replace(ipfsPrefix, "https://cloudflare-ipfs.com/ipfs/");
    }
    return ipfsUrl; // Return the original URL if it's not an IPFS URL
  };

  const PlaceholderImage = "https://place-hold.it/100x100/white";

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>X</CloseButton>
        {showNFTSelection ? (
          <>
            <h2>Select Your NFT</h2>
            <NFTGrid>
              {nfts
                .filter(
                  (nft) => nft.media?.originalMediaUrl && !nft.possibleScam
                )
                .map((nft, index) => {
                  const imageUrl = convertIpfsUrl(nft.media?.originalMediaUrl);

                  return (
                    <NFTThumbnail
                      key={index}
                      onClick={() => selectNFT(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`NFT ${index}`}
                        onError={(e) =>
                          (e.currentTarget.src = PlaceholderImage)
                        } // Replace with placeholder on error
                      />
                    </NFTThumbnail>
                  );
                })}
            </NFTGrid>
          </>
        ) : (
          <>
            <h2>Edit Profile</h2>
            <Button onClick={() => setShowNFTSelection(true)}>
              Select NFT
            </Button>
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
          </>
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

const Button = styled.button`
  margin-top: 20px;
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
