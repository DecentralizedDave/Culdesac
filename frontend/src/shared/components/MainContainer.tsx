import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;
`;

const MainContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <Container>{children}</Container>;
  };

export default MainContainer;