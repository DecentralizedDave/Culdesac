import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../shared/components/walletContext';

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
      <h2>My profile</h2>
    </div>
  );
};

export default MyProfile;
