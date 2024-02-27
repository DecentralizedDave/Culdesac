// In WalletContext.tsx, make sure to define WalletProviderProps
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { doc, getDoc } from 'firebase/firestore';
import db from '../../data/firebase/firebaseConfig';

interface WalletContextType {
  isConnected: boolean;
  address: string | undefined;
  userProfileExists: boolean;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: React.ReactNode; // Using React.ReactNode for children prop
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { isConnected, address } = useAccount();
  const [userProfileExists, setUserProfileExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUserProfile = async () => {
      setLoading(true); // Ensure loading is set to true at the start of the effect
      if (isConnected && address) {
        const docRef = doc(db, "userProfiles", address);
        const docSnap = await getDoc(docRef);
        setUserProfileExists(docSnap.exists());
      }
      setLoading(false);
    };

    checkUserProfile();
  }, [isConnected, address]);

  return (
    <WalletContext.Provider value={{ isConnected, address, userProfileExists, loading }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
