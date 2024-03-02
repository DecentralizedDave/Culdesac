import { useState } from "react";
import styled from "styled-components";
import MainContainer from "../../MainContainer";
import { COLORS } from "../../../../shared/constants/colors";

import RiddleModal from "./riddleModal";

function RiddleCabinet() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <MainContainer>
        <StyledContainer>
          <SubContainer>
            <h3>Riddle Vaults</h3>
            <CommunityDiv>
              <RiddleGrid>
                <Riddle onClick={handleOpenModal}>
                  <p>Riddle #1</p>
                </Riddle>
                <Riddle onClick={handleOpenModal}>
                  <p>Riddle #2</p>
                </Riddle>
                <Riddle onClick={handleOpenModal}>
                  <p>Riddle #3</p>
                </Riddle>
              </RiddleGrid>
            </CommunityDiv>
          </SubContainer>
        </StyledContainer>
      </MainContainer>
      <RiddleModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default RiddleCabinet;

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
  align-items: flex-start;
  justify-content: flex-start;
  color: ${COLORS.black};
  gap: 20px;
  margin: 25px 0;
`;

const RiddleGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

const Riddle = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  padding: 20px;
  font-weight: 600;
  background-color: ${COLORS.white};
  background-size: cover;
  border: 2px solid ${COLORS.buttons.primary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
`;
