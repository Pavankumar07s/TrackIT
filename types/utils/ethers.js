// import { useState, useEffect } from "react";
// import WalletConnectProvider from "@walletconnect/react-native-dapp";
// import { ethers } from "ethers";
// import { contractAddress } from "./contract"; 
// import { RecycleChain__factory } from "../../app/generated/typechain-types"; 

// export const useAccount = () => {
//   const [account, setAccount] = useState("");
//   const [balance, setBalance] = useState("");
//   const [isOwner, setIsOwner] = useState(false);
//   const [contract, setContract] = useState(null);

//   const initializeWalletConnect = async () => {
//     try {
//       const provider = new WalletConnectProvider({
//         bridge: "https://bridge.walletconnect.org",
//       });

//       await provider.connect();

//       const web3Provider = new ethers.providers.Web3Provider(provider);
//       const signer = web3Provider.getSigner();

//       const contract = RecycleChain__factory.connect(contractAddress, signer);
//       setContract(contract);

//       const accounts = await web3Provider.listAccounts();
//       if (accounts.length > 0) {
//         const account = accounts[0];
//         setAccount(account);

//         const balance = await web3Provider.getBalance(account);
//         setBalance(ethers.utils.formatEther(balance));

//         const contractOwner = await contract.owner();
//         setIsOwner(account.toLowerCase() === contractOwner.toLowerCase());
//       } else {
//         console.error("No accounts detected");
//       }
//     } catch (error) {
//       console.error("Error initializing WalletConnect:", error);
//     }
//   };

//   useEffect(() => {
//     initializeWalletConnect();
//   }, []);

//   return { account, balance, isOwner, contract };
// };
