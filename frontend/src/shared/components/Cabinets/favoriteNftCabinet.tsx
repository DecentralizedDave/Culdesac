import styled from "styled-components";

import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";

interface FavoriteNftCabinetProps {
    address: string; 
}

function FavoriteNftCabinet({ address }: FavoriteNftCabinetProps) {
    console.log(address)
    return (
      <MainContainer>
      <StyledContainer>
        <SubContainer>
          <h3>My Top 5 NFTs</h3>
          <CommunityDiv>
            <img
              src="https://i.seadn.io/gcs/files/310310295e27ef80cf33b2d4c69af410.png?auto=format&dpr=1&w=512"
              alt="community"
            />
            <img
              src="https://i.seadn.io/s/raw/files/4bdb9279b2fa4bc4feab63383f8f056e.png?auto=format&dpr=1&w=512"
              alt="community"
            />
            <img
              src="https://i.seadn.io/s/raw/files/96df2da6dd8d3125ed0fe80b2329d87d.png?auto=format&dpr=1&w=512"
              alt="community"
            />
            <img
              src="https://pbs.twimg.com/media/GGywGyJXsAA1zg7?format=jpg&name=medium"
              alt="community"
            />
            <img
              src="https://i.seadn.io/gcs/files/6738e68894dbb1125a8773ebf4b49cb3.png?auto=format&dpr=1&w=512"
              alt="community"
            />
          </CommunityDiv>
        </SubContainer>
      </StyledContainer>
    </MainContainer>
    )
}

export default FavoriteNftCabinet

// styles

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
  overflow-x: auto;
  white-space: nowrap; 
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none; 
  }
  flex-direction: row;
  width: 100%;
  gap: 10px;
  margin: 25px 0;
  & img {
    height: 150px;
    width: auto; /* Adjust based on your needs */
    border-radius: 10px;
    cursor: pointer;
    transition: 250ms ease-in-out;
    &:hover {
      border: 3px solid pink;
    }
  }
`;