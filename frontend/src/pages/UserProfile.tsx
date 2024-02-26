import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../data/firebase/firebaseConfig.js'; 

export function UserProfile() {
  const { address } = useAccount();
  const { userAddress } = useParams<{ userAddress: string }>();
  const profileAddress = userAddress || address;

  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (profileAddress) {
        const docRef = doc(db, "userProfiles", profileAddress);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().username); // Assuming the profile has a username field
        } else {
          console.log("No such profile!");
          // Here you could also initialize a profile in Firestore if one doesn't exist
          await setDoc(docRef, { username: "New User" }); // Example initialization
        }
      }
    };

    fetchUserProfile();
  }, [profileAddress]);

  return (
    <>
      <Test>Username: {username || 'Loading...'}</Test>
    </>
  );
}


// styles

const Test = styled.h2`

`