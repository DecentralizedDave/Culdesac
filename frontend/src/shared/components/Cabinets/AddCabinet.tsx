import styled from "styled-components";

import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";

import { Add } from "@mui/icons-material";

interface AddCabinetProps {
    onAddCabinetClick: () => void;
  }

  function AddCabinet({ onAddCabinetClick }: AddCabinetProps) {
    return (
        <MainContainer>
            <StyledContainer onClick={onAddCabinetClick}>
                <div>
                    <Add/> <span>Add a Cabinet</span>
                </div>
            </StyledContainer>
        </MainContainer>
    )
}

export default AddCabinet

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
  cursor: pointer;
  transition: 250ms;
  margin-bottom: 50px;
  &:hover {
    opacity: 0.7;
  }
  & div {
    display: flex;
    justify-content: center;
    alogn-items: center;
    padding: 5px 0;
    color: ${COLORS.black};
    & span {
        color: ${COLORS.black};
        font-weight: 600;
    }
  }
`;


