import styled from "styled-components";
import { useState } from "react";

import MainContainer from "../MainContainer";
import { Visibility, OpenInFull, CloseFullscreen } from "@mui/icons-material";
import { COLORS } from "../../../shared/constants/colors";

interface GossipCabinetProps {
  address: string;
}

function GossipCabinet({ address }: GossipCabinetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <MainContainer>
      <StyledContainer>
        <SubContainer>
          <span>
            <h3>Gossip</h3>
            <Visibility fontSize="small" style={{ marginRight: "5px" }} /> only
            visible to you
          </span>
          <div>
            <button onClick={toggleOpen}>
              {isOpen ? (
                <CloseFullscreen fontSize="small" />
              ) : (
                <OpenInFull fontSize="small" />
              )}
            </button>
          </div>
        </SubContainer>
        {isOpen && (
          <>
            <CommentSection>
              <UserPicture>
                <img
                  src="https://images.mcpepes.com/7f7b00fa478aaaf5a16803563d87fd9d59e6db41f158e3547397780af9b60d40.gif"
                  alt="Close Friend"
                />
              </UserPicture>
              <UserComment>
                <div>
                  <h4>Dave</h4>
                  <span>2 min ago</span>
                </div>
                <p>This guy is pretty sick!</p>
                <button>reply</button>
              </UserComment>
            </CommentSection>
          </>
        )}
      </StyledContainer>
    </MainContainer>
  );
}

export default GossipCabinet;

// styles

const StyledContainer = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.buttons.primary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  width: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  & h3 {
    font-size: 20px !important;
    color: ${COLORS.buttons.primary};
    margin-right: 10px;
  }
  & span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: ${COLORS.secondary};
  }
  & div {
    & button {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: ${COLORS.secondary};
      border: none;
      border-radius: 2px;
      padding: 2px;
    }
  }
`;

const CommentSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
`;

const UserPicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    width: 42px;
    height: 42px;
    border-radius: 100px;
  }
`;

const UserComment = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 20px;
  & div {
    display: flex;
    flex-direction: row;
    align-items: center;
    & h4 {
      font-size: 17px;
      color: ${COLORS.black};
    }
    & span {
      font-size: 12px;
      color: ${COLORS.buttons.secondary};
      margin-left: 8px;
    }
  }
  & p {
    font-size: 16px;
    color: ${COLORS.black};
  }
  & button {
    margin-top: 5px;
    cursor: pointer;
    border: none;
    background: transparent;
    color: ${COLORS.buttons.secondary};
    width: 15%;
    &:hover {
        color: ${COLORS.black};
    }
  }
`;
