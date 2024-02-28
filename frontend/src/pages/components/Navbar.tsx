import styled from "styled-components";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../data/firebase/firebaseConfig";
import { useAccount } from "wagmi";

export function Navbar() {
  const { address, isConnected } = useAccount();
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (address) {
        const docRef = doc(db, "userProfiles", address);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfileImg(docSnap.data().profileimg || "");
        } else {
          console.log("No profile found for the address");
        }
      }
    };

    fetchUserData();
  }, [address]);

  return (
    <MainContainer>
      <Head>
        <Container>
          <Link to="/">
            <h2>Culdesac</h2>
          </Link>
          <div>
            <w3m-button balance="hide" label="Login" />
            {isConnected && (
              <Link to="/profile">
                <ProfilePic>
                  {/* Show profile image or a placeholder if not available */}
                  <img src={profileImg || "https://thumbs2.imgbox.com/0e/65/iUW18SaA_t.png"} alt="My Profile"/>
                </ProfilePic>
              </Link>
            )}
          </div>
        </Container>
      </Head>
    </MainContainer>
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
  flex-shrink: 0;
  width: 35px;
  height: 35px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;

  @media (max-width: 1200px) {
    padding: 0 15px;
  }
`;
