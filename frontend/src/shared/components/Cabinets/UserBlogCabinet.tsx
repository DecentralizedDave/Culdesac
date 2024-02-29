import styled from "styled-components";
import { useEffect, useState } from "react";
import db from "../../../data/firebase/firebaseConfig";
import { doc, getDoc, DocumentData } from "firebase/firestore";

import MainContainer from "../MainContainer";
import { COLORS } from "../../../shared/constants/colors";

interface UserBlogCabinetProps {
  address: string;
}

function UserBlogCabinet({ address }: UserBlogCabinetProps) {
  const [userData, setUserData] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (address) {
        const userRef = doc(db, "userProfiles", address);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such user!");
        }
      }
    };

    fetchUserData();
  }, [address]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <MainContainer>
      <StyledContainer>
        <SubContainer>
          <h3>{userData.username}'s Blog</h3>
          <div>
            <button>View All</button>
          </div>
        </SubContainer>
        <BlogContainer>
            <span>There are no Blog Entries yet</span>
        </BlogContainer>
      </StyledContainer>
    </MainContainer>
  );
}

export default UserBlogCabinet;

// styles

const StyledContainer = styled.div`
  background: ${COLORS.white};
  border: 1px solid ${COLORS.secondary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 15px;
  width: 100%;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  & h3 {
    color: ${COLORS.black};
  }
  & button {
    background: transparent;
    border: none;
    color: ${COLORS.buttons.primary};
  }
`;

const BlogContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 25px;
  color: ${COLORS.secondary};
`;
