// import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainContainer from "../../MainContainer";
import { COLORS } from "../../../../shared/constants/colors";

import { LocalActivity } from '@mui/icons-material'

function RafflesCabinet() {
  return (
    <MainContainer>
      <StyledContainer>
        <SubContainer>
          <h3>Live Raffles</h3>
          <CommunityDiv>
            <Raffle>
                <ProfilePicture>
                    <img src="https://assets-global.website-files.com/6509f2d4d3b1934eeab6993b/6558f41b4cb61f6f2b5c22cf_paige.png" alt="raffle nft"/>
                </ProfilePicture>
                <h3>NFT #1232</h3>
                <button><LocalActivity style={{ marginRight: '5px' }}/> Get Ticket</button>
            </Raffle>
            <Raffle>
                <ProfilePicture>
                    <img src="https://assets-global.website-files.com/6509f2d4d3b1934eeab6993b/6558f41b4cb61f6f2b5c22cf_paige.png" alt="raffle nft"/>
                </ProfilePicture>
                <h3>NFT #1232</h3>
                <button><LocalActivity style={{ marginRight: '5px' }}/> Get Ticket</button>
            </Raffle>
          </CommunityDiv>
        </SubContainer>
      </StyledContainer>
    </MainContainer>
  );
}

export default RafflesCabinet;

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
  display: flex;
  flex-direction: row;
  color: ${COLORS.black};
  gap: 20px;
  margin: 25px 0;
`;

const Raffle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  padding: 12px;
  border: 1px solid ${COLORS.secondary};
  border-radius: 10px;
  & h3 {
    color: ${COLORS.black};
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
  align-items: center;
  transition 250ms ease-in-out;
  &:hover {
      opacity: 0.8;
  }
  }
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
