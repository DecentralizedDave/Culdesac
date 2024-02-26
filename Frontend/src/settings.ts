import { sepolia, mainnet } from 'wagmi/chains'

export const INFURA_API_KEY = import.meta.env.VITE_INFURA_API_KEY as string
export const DEFAULT_CHAIN_ID = parseInt(import.meta.env.VITE_DEFAULT_CHAIN_ID ?? '1')
export const HARDHAT_CHAIN_ID = 31337
export const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string

const DOGELON_LOCKER_CONTRACT_ADDRESS_11155111 = import.meta.env
  .VITE_DOGELON_LOCKER_CONTRACT_ADDRESS_11155111 as string

const DOGELON_LOCKER_CONTRACT_ADDRESS_1 = import.meta.env
  .VITE_DOGELON_LOCKER_CONTRACT_ADDRESS_1 as string

export const DOGELON_LOCKER_CONTRACT_ADDRESS_BY_CHAIN: { [chainId: number]: string } = {
  [mainnet.id]: DOGELON_LOCKER_CONTRACT_ADDRESS_1,
  [sepolia.id]: DOGELON_LOCKER_CONTRACT_ADDRESS_11155111,
}

export const API_URL = import.meta.env.VITE_API_URL as string

const requiredEnvVars = [
  INFURA_API_KEY,
  WALLET_CONNECT_PROJECT_ID,
  DOGELON_LOCKER_CONTRACT_ADDRESS_11155111,
  DOGELON_LOCKER_CONTRACT_ADDRESS_1,
  API_URL,
]

requiredEnvVars.forEach((env) => {
  if (!env) {
    throw new Error('Required env variable not set ' + requiredEnvVars)
  }
})