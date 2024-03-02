import { useState, useEffect } from 'react';
import { useReadContract } from 'wagmi';
import VaultABI from "../web3/abi/CuldesacRiddleGame.json"

const CONTRACT_ADDRESS = import.meta.env.VITE_RIDDLE_CONTRACT_ADDRESS;

interface EthVault {
    id: bigint;
    answerHash: bigint;
    amount: number;
    claimer: string;
}

interface Erc20Vault {
    id: bigint;
    answerHash: bigint;
    amount: number;
    addr: string;
    claimer: string;
}

interface Erc721Vault {
    id: bigint;
    answerHash: bigint;
    addr: string;
    tokenId: number;
    claimer: string;
}

interface VaultData {
    ethVaults: EthVault[];
    erc20Vaults: Erc20Vault[];
    erc721Vaults: Erc721Vault[];
    hasMore: boolean;
}

type GetVaultsReturnType = [EthVault[], Erc20Vault[], Erc721Vault[], boolean];

export function readVaults() {
    const [vaults, setVaults] = useState<VaultData>({
        ethVaults: [],
        erc20Vaults: [],
        erc721Vaults: [],
        hasMore: false,
    });
    const { data, isError, isLoading } = useReadContract({
        address: CONTRACT_ADDRESS,
        abi: VaultABI,
        functionName: 'getVaults',
        args: [8, 0]
    });

    useEffect(() => {
        if (isError) {
            console.error('Error fetching vaults:', isError);
        }
        
        if (data) {
            console.log('Data:', data);
            const typedData = data as GetVaultsReturnType;
            setVaults({
                ethVaults: typedData[0],
                erc20Vaults: typedData[1],
                erc721Vaults: typedData[2],
                hasMore: typedData[3],
            });
        }
    }, [data, isError]);

    return { vaults, isError, isLoading };
}