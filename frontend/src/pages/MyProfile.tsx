import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../shared/components/walletContext';
import { doc, getDoc } from 'firebase/firestore';
import db from '../data/firebase/firebaseConfig.js'; 
import { useAccount } from 'wagmi';

const MyProfile = () => {
  const { isConnected } = useWallet();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isConnected) {
      navigate('/'); // Redirect to the home page or a sign-in page if not connected
    }
  }, [isConnected, navigate]);

  return (
    <div>
      {/* Profile content goes here */}
    </div>
  );
};

export default MyProfile;
