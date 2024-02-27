import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 30px;
  @media (max-width: 1200px) {
    padding: 0 15px;
  }
`;

const MainContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <Container>{children}</Container>;
  };

export default MainContainer;