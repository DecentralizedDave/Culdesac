import styled from "styled-components";
import { Link } from "react-router-dom";

import { useAccount } from "wagmi";

export function Navbar() {
  const { isConnected } = useAccount();
  return (
    <Head>
      <Container>
        <Link to="/">
          <h2>Culdesac</h2>
        </Link>
        <div>
          <w3m-button balance="hide" label="Login" />
          {isConnected && (
            <Link to="/profile">
              <ProfilePic />
            </Link>
          )}
        </div>
      </Container>
    </Head>
  );
}

// styles

const Head = styled.div`
  width: 100%;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & div {
    display: flex;
    align-items: center;
  }
`;

const ProfilePic = styled.div`
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
  margin-left: 15px;
  cursor: pointer;
`;
