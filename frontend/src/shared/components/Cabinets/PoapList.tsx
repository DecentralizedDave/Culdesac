import { useState, useEffect } from "react";
import styled from "styled-components";
import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";
import axios from "axios";

interface PoapEvent {
  event: {
    image_url: string;
  };
}

interface PoapListProps {
  address: string;
}

function PoapList({ address }: PoapListProps) {
  const [poaps, setPoaps] = useState<PoapEvent[]>([]);

  useEffect(() => {
    if (address) {
      const fetchPOAPs = async () => {
        const options = {
          method: "GET",
          url: `https://api.poap.tech/actions/scan/${address}`,
          headers: {
            accept: "application/json",
            "x-api-key": import.meta.env.VITE_APP_POAP_API,
          },
        };

        try {
          const response = await axios.request(options);
          setPoaps(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchPOAPs();
    }
  }, [address]);

  if (poaps.length === 0) return null;

  return (
    <MainContainer>
      <StyledContainer>
        <SubContainer>
          <h3>POAPs Collector</h3>
        </SubContainer>
        <PoapContainer>
          {poaps.map((poap, index) => (
            <img
              key={index}
              src={poap.event.image_url}
              alt={`POAP ${index + 1}`}
            />
          ))}
        </PoapContainer>
      </StyledContainer>
    </MainContainer>
  );
}

export default PoapList;
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

const PoapContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  margin-top: 15px;
  & img {
    height: 50px;
    width: auto;
    border-radius: 100px;
    cursor: pointer;
    transition: 250ms ease-in-out;
    &:hover {
        border: 3px solid pink;
    }
  }
`;

