import styled from "styled-components";

import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";

interface FavCommunityProps {
  address: string; // Define the type for the address prop
}

function FavCommunity({ address }: FavCommunityProps) {
  console.log(address);
  return (
    <MainContainer>
      <StyledContainer>
        <SubContainer>
          <h3>My Favorite Community</h3>
          <CommunityDiv>
            <img
              src="https://pbs.twimg.com/profile_images/1691820221558829056/mvTXaDEN_400x400.jpg"
              alt="community"
            />
            <div>
              <h4>Eth Denver 🏔🦬🦄</h4>
              <p>A community #BUIDLing the decentralized future.</p>
              <button>View Community</button>
            </div>
          </CommunityDiv>
        </SubContainer>
      </StyledContainer>
    </MainContainer>
  );
}

export default FavCommunity;

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
  display: flex;
  flex-direction: row;
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
