import React, {useState, useEffect} from 'react';
import './App.css';
import Body from './Body';
import abi from './assets/MyNFT.json';
import {ethers} from  "ethers";


export interface IState {
  provider : ethers.BrowserProvider | null;
  signer : ethers.JsonRpcSigner | null;
  contract : ethers.Contract | null;
}

const App : React.FC = () =>{
  
  const [state, setState] = useState<IState | null>({
    provider: null,
    signer: null,
    contract: null
  });

  

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x6012c65D414a8468334957a93a3636B23188F470";
      const contractAddressAbi = abi.abi;

      try {
        const { ethereum } = window;
        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAddressAbi,
            signer
          );

          
          
          setState({ provider, signer, contract });
        } else {
          alert("metamask not installed");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  return (
    <React.Fragment>
      
      <Body state={state} />
    </React.Fragment>
  );
}

export default App;