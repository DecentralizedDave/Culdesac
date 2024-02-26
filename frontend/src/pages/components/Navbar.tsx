import styled from "styled-components";

export function Navbar() {
  return (
    <Head>
      <Container>
        <h2>Culdesac</h2>
        <div>
        <w3m-button balance="hide" label="Login" />
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
`;
