import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs, DocumentData } from 'firebase/firestore';
import db from '../data/firebase/firebaseConfig.js'; 

const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (username) {
        // Adjust the query to look for the username field
        const usersRef = collection(db, 'userProfiles');
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // Assuming username is unique, take the first document found
          const userDoc = querySnapshot.docs[0];
          setUserData(userDoc.data());
        } else {
          console.log("No such user!");
        }
      }
    };

    fetchUserData();
  }, [username]);
  

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{userData.username}'s Profile</h1>
      {/* Display other user data */}
    </div>
  );
};

export default UserProfile;