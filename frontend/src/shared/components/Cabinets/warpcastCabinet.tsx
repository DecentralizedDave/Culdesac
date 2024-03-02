import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";
import { FarcasterEmbed } from "react-farcaster-embed";
import "react-farcaster-embed/dist/styles.css";


function WarpCastCabinet() {
  const [embedContent, setEmbedContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    async function fetchEmbed() {
      try {
        const content = await FarcasterEmbed({ url: "https://warpcast.com/ethdenver/0x9bc56c32" });
        setEmbedContent(content);
      } catch (error) {
        console.error("Failed to load Farcaster embed:", error);
        setEmbedContent("Failed to load content.");
      }
    }

    fetchEmbed();
  }); 

  return (
    <MainContainer>
      <StyledContainer>
        <SubContainer>
          <h3>Warpcast</h3>
          <CommunityDiv>
            {embedContent}
          </CommunityDiv>
        </SubContainer>
      </StyledContainer>
    </MainContainer>
  );
}

export default WarpCastCabinet;

// styles

const StyledContainer = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.secondary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  & h3 {
    color: ${COLORS.black};
  }
`;

const CommunityDiv = styled.div`
  width: 100%;
  color: ${COLORS.black};
  gap: 10px;
  margin: 25px 0;
  & img {
    height: 150px;
    width: auto;
    margin-right: 25px;
    border-radius: 10px;
    cursor: pointer;
    transition: 250ms ease-in-out;
    &:hover {
      border: 3px solid pink;
    }
  }
  & div {
    display: flex;
    flex-direction: column;
    & h4 {
      font-size: 24px;
    }
    & p {
      margin-top: 10px;
    }
    & button {
      background-color: ${COLORS.buttons.secondary};
    margin: 5px;
    border: none;
    padding: 8px 15px;
    color: ${COLORS.black};
    font-weight: 600;
    border-radius: 5px;
    margin-top: 35px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition 250ms ease-in-out;
    &:hover {
        opacity: 0.8;
    }
    }
  }
`;
