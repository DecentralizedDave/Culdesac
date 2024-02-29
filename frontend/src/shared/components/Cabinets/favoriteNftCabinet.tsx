import styled from "styled-components";

import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";

interface FavoriteNftCabinetProps {
    address: string; // Define the type for the address prop
}

function FavoriteNftCabinet({ address }: FavoriteNftCabinetProps) {
    console.log(address)
    return (
        <MainContainer>
            <StyledContainer>
                <SubContainer>
                    <h3>My Favorite NFT</h3>
                </SubContainer>
            </StyledContainer>
        </MainContainer>
    )
}

export default FavoriteNftCabinet

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
  align-items: center;
  width: 100%;
  & h3 {
    color: ${COLORS.black};
  }
`;