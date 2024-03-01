import styled from "styled-components";

import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";

interface MusicPlayerCabinetProps {
  address: string;
}

function MusicPlayerCabinet({ address }: MusicPlayerCabinetProps) {
  console.log(address);
  return (
    <MainContainer>
      <StyledContainer>
        <SubContainer>
          <h3>Music Player</h3>
        </SubContainer>
        <MusicPlayerContainer>
          <PlayerControls>
            <SongInfo>
              <Title>Buidl</Title>
              <Album>Eth Denver</Album>
              <SliderContainer>
                <PlayButton aria-label="Play"></PlayButton>
                <Time>3:25</Time>
                <Slider />
              </SliderContainer>
            </SongInfo>
            <AlbumArt
              src="https://i1.sndcdn.com/artworks-000118844886-67e5u7-t240x240.jpg"
              alt="Album Art"
            />
          </PlayerControls>
        </MusicPlayerContainer>
      </StyledContainer>
    </MainContainer>
  );
}

export default MusicPlayerCabinet;

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

const MusicPlayerContainer = styled.div`
  color: ${COLORS.black};
  padding: 15px;
  border-radius: 10px;
  width: 770px;
  margin: 0 auto;
  box-sizing: border-box;
`;


const PlayerControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 20px;
`;

const PlayButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 20px solid ${COLORS.black}; 
  border-top: 10px solid transparent; 
  border-bottom: 10px solid transparent; /
  &:focus {
    outline: none;
  }
  &:hover {
    border-left: 20px solid #ddd;
  }
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Album = styled.div`
  font-size: 0.8em;
  margin-bottom: 15px;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Time = styled.div`
  align-self: flex-end;
  margin-right: 10px;
  color: ${COLORS.black};
  padding-bottom: 5px;
`;

const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
`;

const AlbumArt = styled.img`
  width: 150px;
  height: 150px;
  background-color: #ccc; 
  border-radius: 10px; 
  object-fit: cover; 
  margin-left: 20px;
`;
