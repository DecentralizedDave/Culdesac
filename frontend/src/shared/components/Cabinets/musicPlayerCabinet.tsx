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
          <Heading>My Music</Heading>
          <PlayerControls>
            <SongInfo>
              <Title>Digits</Title>
              <Album>Yung Thug</Album>
              <SliderContainer>
                <PlayButton aria-label="Play"></PlayButton>
                <Time>3:25</Time>
                <Slider />
              </SliderContainer>
            </SongInfo>
            <AlbumArt
              src="https://imgs.search.brave.com/Ef-u78edh_dK30SrekXhsEw6yjy3mw8TU-ydFWpD93I/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLXNSTHhX/TGVhaktpaC0wLXQ1/MDB4NTAwLmpwZw"
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
  background: rgb(34, 38, 40);
  color: white;
  padding: 15px;
  border-radius: 10px;
  width: 770px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Heading = styled.h2`
  margin: 0 0 20px 0;
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
  border-left: 20px solid white; /* Creates the right-pointing triangle */
  border-top: 10px solid transparent; /* Top part of the triangle */
  border-bottom: 10px solid transparent; /* Bottom part of the triangle */
  &:focus {
    outline: none;
  }
  &:hover {
    border-left: 20px solid #ddd; /* Slightly changes the color on hover */
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
  margin-right: 60px;
  padding-bottom: 5px;
`;

const Slider = styled.input.attrs({ type: 'range' })`
  width: 100%;
  /* Add custom styles for the slider */
`;

const AlbumArt = styled.img`
  width: 200px;
  height: 200px;
  background-color: #ccc; // This will be the fallback color if the image fails to load
  border-radius: 10px; // If you want rounded corners
  object-fit: cover; // This will cover the area without stretching the image
  margin-left: 20px;
`;
