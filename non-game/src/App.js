import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import console from "console";
import {
  useChain,
  useWeb3ExecuteFunction,
  useMoralisFile,
} from "react-moralis";
import { useState } from "react";
import "./App.css";
import MainButton from "./Component/Button/Button";
import FlappyGenerator from "./Component/FlappyGenerator/FlappyGenerator";
import { FlappyBirdABI } from "./helpers/ABI";

function App() {
  const {
    authenticate,
    isAuthenticated,
    user,
    logout,
    web3,
    enableWeb3,
    isWeb3Enabled,
  } = useMoralis();
  const { switchNetwork, chainId, chain, account } = useChain();
  const [color, setColor] = useState("");
  const [contractAddress, setContractAddress] = useState(
    "0x94e8E62ABBAAE0A122540252fAcA5F55a91bfE37"
  );

  const [flappyBirdSVG, setFlappyBirdSVG] = useState();
  const {
    error: ipfsError,
    isUploading,
    moralisFile,
    saveFile,
  } = useMoralisFile();
  const [ipfsHash, SetIpfsHash] = useState();

  async function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    await setColor(color);
  }

  async function processMint() {
    await getSVG();
    if (moralisFile._hash !== null) {
      fetch();
    }
  }
  // convert svg to string

  async function getSVG() {
    const svg = document.getElementById("FlappySVG");
    const svgString = new XMLSerializer().serializeToString(svg);
    setFlappyBirdSVG(svgString);
    console.log(svg);
  }

  // Save svg to ipfs
  useEffect(() => {
    flappyBirdSVG ? console.log(flappyBirdSVG) : console.log("no svg");
    const file = { base64: window.btoa(flappyBirdSVG) };
    saveFile("FlappyBird.svg", file, {
      saveIPFS: true,
    });
  }, [flappyBirdSVG, saveFile]);

  useEffect(() => {
    if (moralisFile !== null) {
      console.log(moralisFile._ipfs);
      SetIpfsHash(moralisFile._ipfs);
    }
  }, [moralisFile]);

  // Save Metadata to IPFS

  // Mint NFT

  const {
    data,
    error: contractFunctionError,
    fetch,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction({
    abi: FlappyBirdABI,
    contractAddress: contractAddress,
    functionName: "safeMint",
    params: {
      uri: ipfsHash,
    },
  });

  // alert(ABIofFunction("safeMint"));

  // TODO: check if metamask extension is installed in the browser

  // object structure data={ Function: logout, Name: "LogOut" style = "" }

  if (!isAuthenticated) {
    return (
      <div className="main CenterAll Vertical Spaces">
        <MainButton
          MainName="Connnect"
          data={[
            {
              Function: authenticate,
              FunctionParma: {},
              Name: "Metamask",
              ButtonStyle: "Normal",
            },
            {
              Function: authenticate,
              FunctionParma: { provider: "walletconnect" },
              Name: "Wallet Connect",
              ButtonStyle: "Normal",
            },
          ]}
        />
      </div>
    );
  }

  if (isAuthenticated && chainId !== "0x13881") {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
    if (isWeb3Enabled) {
      return (
        <div className="main CenterAll Vertical Spaces">
          <MainButton
            MainName="Wrong Network!!"
            data={[
              {
                Function: switchNetwork,
                FunctionParma: "0x13881",
                Name: "To Mumbai🚀",
                ButtonStyle: "",
              },
            ]}
          />
        </div>
      );
    }
  } else {
    return (
      <div className="main CenterAll Vertical Spaces">
        <div className="MinterZone CenterAll " id="MinterZone">
          <FlappyGenerator color={color} />
        </div>
        <MainButton
          MainName="Check Me"
          data={[
            {
              Function: getRandomColor,
              FunctionParma: {},
              Name: "Generate Flappy",
              ButtonStyle: "Normal",
            },
            {
              Function: processMint,
              FunctionParma: {},
              Name: "Mint Flappy",
              ButtonStyle: "Normal",
            },
            {
              Function: logout,
              FunctionParma: {},
              Name: "LogOut",
              ButtonStyle: "",
            },
          ]}
        />
      </div>
    );
  }
}
export default App;
