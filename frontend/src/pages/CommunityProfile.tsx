import styled from "styled-components";
import { useState } from "react";
import { COLORS } from "../shared/constants/colors";
import MainContainer from "../shared/components/MainContainer";

import { X, Telegram, LocationOn, Explore, Games } from "@mui/icons-material";
import WarpCastCabinet from "../shared/components/Cabinets/warpcastCabinet";
import RafflesCabinet from "../shared/components/Cabinets/Games/RafflesCabinet";
import RiddleCabinet from "../shared/components/Cabinets/Games/RiddleGame";

interface TabProps {
  active: boolean;
}

export function CommunityProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <MainContainer>
      <BannerDiv>
        <img
          src="https://pbs.twimg.com/profile_banners/754438462141378560/1692196360/1500x500"
          alt="Communit Banner"
        />
        <SocialMediaIcons>
          <a href={`https://x.com/s`} target="_blank" rel="noopener noreferrer">
            <X />
          </a>

          <a
            href={`https://telegram.me/s`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram />
          </a>
        </SocialMediaIcons>
      </BannerDiv>
      <TopContainer>
        <ProfilePicture>
          <img
            src="https://pbs.twimg.com/profile_images/1691820221558829056/mvTXaDEN_400x400.jpg"
            alt="Profile Pic"
          />
        </ProfilePicture>
        <InfoContainer>
          <UserInfo>
            <h2>Eth Denver 🏔🦬🦄</h2>
            <span>
              <LocationOn />
              Location: Denver
            </span>
            <p>A community #BUIDLing the decentralized future.</p>
          </UserInfo>
          <ActionButtons>
            <ActionButton>Join Community</ActionButton>
            <ActionButton>Send Message</ActionButton>
            <ActionButton>Send a Gift</ActionButton>
            <ActionButton>Report</ActionButton>
          </ActionButtons>
        </InfoContainer>
      </TopContainer>
      <TabsContainer>
        <Tab
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          <Explore style={{ marginRight: "5px" }} /> Overview
        </Tab>
        <Tab
          active={activeTab === "games"}
          onClick={() => setActiveTab("games")}
        >
          <Games style={{ marginRight: "5px" }} /> Games
        </Tab>
      </TabsContainer>
      {activeTab === "overview" && (
        <>
          <StyledContainer>
            <SubContainer>
              <h3>About</h3>
            </SubContainer>
            <OverviewContainer></OverviewContainer>
          </StyledContainer>
          <WarpCastCabinet address="dummy_address" />
        </>
      )}
      {activeTab === "games" && (
        <>
          <RafflesCabinet />
          <RiddleCabinet />
        </>
      )}
    </MainContainer>
  );
}

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

const StyledContainer = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.secondary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  margin-top: 25px;
  width: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  & h3 {
    color: ${COLORS.black};
  }
`;

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  margin-top: 15px;
`;

const TabsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`;

const Tab = styled.div<TabProps>`
  background-color: ${({ active }) =>
    active ? COLORS.secondary : "transparent"};
  color: ${COLORS.black};
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;
