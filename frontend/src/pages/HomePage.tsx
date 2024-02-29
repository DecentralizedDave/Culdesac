import styled from "styled-components";
import { useEffect, useState } from "react";
import { useWallet } from "../shared/components/walletContext";
import UsernameModal from "../shared/components/usernameModal";
import MainContainer from "../shared/components/MainContainer";
import { COLORS } from "../shared/constants/colors";

import Banner from "../assets/homebanner.png"

export function HomePage() {
  const { isConnected, userProfileExists, address, loading } = useWallet();
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && isConnected && !userProfileExists) {
      setIsUsernameModalOpen(true);
    } else {
      setIsUsernameModalOpen(false);
    }
  }, [isConnected, userProfileExists, loading]);

  const handleCloseModal = () => setIsUsernameModalOpen(false);

  return (
    <>
    <MainContainer>
      <SubContainer>
        <img src={Banner} alt="Culdesac.Club"/>
        <InputDiv>
        <input type="text" placeholder="search"/>
        <button>Search</button>
        </InputDiv>
      </SubContainer>
    </MainContainer>
      {isUsernameModalOpen && (
        <UsernameModal
          isOpen={isUsernameModalOpen}
          onClose={handleCloseModal}
          address={address}
        />
      )}
    </>
  );
}

// styles

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  & img {
    width: 80%;
  }
`

const InputDiv = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  & input {
    padding: 10px 15px;
    width: 100%;
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

  
