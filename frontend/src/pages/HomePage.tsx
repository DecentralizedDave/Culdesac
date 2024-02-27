// In HomePage.jsx
import { useEffect, useState } from "react";
import { useWallet } from "../shared/components/walletContext";
import UsernameModal from "../shared/components/usernameModal";

export function HomePage() {
  const { isConnected, userProfileExists, address, loading } = useWallet();
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && isConnected && !userProfileExists) {
      setIsUsernameModalOpen(true);
    } else {
      setIsUsernameModalOpen(false);
    }
  }, [isConnected, userProfileExists, loading]);

  const handleCloseModal = () => setIsUsernameModalOpen(false);

  return (
    <>
      <h1>Homepage</h1>
      {isUsernameModalOpen && (
        <UsernameModal
          isOpen={isUsernameModalOpen}
          onClose={handleCloseModal}
          address={address}
        />
      )}
    </>
  );
}

  
