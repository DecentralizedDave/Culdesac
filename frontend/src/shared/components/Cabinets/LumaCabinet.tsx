import styled from "styled-components";

import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";
import { LocationOn } from "@mui/icons-material";

interface LumaCabinetProps {
  address: string;
}

function LumaCabinet({ address }: LumaCabinetProps) {
  console.log(address);
  return (
    <MainContainer>
      <StyledContainer>
        <SubContainer>
          <h3>Upcoming Event</h3>
          <CommunityDiv>
            <div>
              <span>9:00PM - 1AM MST</span>
              <h4>Eth Denver After Party</h4>
              <h5>Sunday, March 3rd</h5>
              <span>
                <LocationOn />
                Location: Denver
              </span>
              <button>View Event</button>
            </div>
            <img
              src="https://cdn.discordapp.com/attachments/1211095157181775954/1213321405504950382/AC3B15AE-761C-4504-A619-63A99CE69D10.jpg?ex=65f50c9d&is=65e2979d&hm=ae10ae46a7408a4c32297da1f9734ff35f1978a50f4b0087cdb3303a13d57f4c&"
              alt="community"
            />
          </CommunityDiv>
        </SubContainer>
      </StyledContainer>
    </MainContainer>
  );
}

export default LumaCabinet;

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
  justify-content: space-between;
  width: 100%;
  color: ${COLORS.black};
  gap: 10px;
  margin: 25px 0;
  & span {
    font-size: 16px;
    font-weight: 500;
    color: ${COLORS.secondary};
  }
  & img {
    height: 200px;
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
    & span {
        display: flex;
        align-items: center;
        margin: 10px 0;
        color: ${COLORS.success};
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
