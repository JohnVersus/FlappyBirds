import React, { useEffect, useRef } from "react";
import { useMoralis } from "react-moralis";
import console from "console";
import { useChain, useWeb3ExecuteFunction, useMoralisWeb3Api, useMoralisFile } from "react-moralis";
import { useState } from "react";
import "./App.css";
import MainButton from "./Component/Button/Button";
import FlappyGenerator from "./Component/FlappyGenerator/FlappyGenerator";
import { FlappyBirdABI } from "./helpers/ABI";

function App() {
  const { authenticate, isAuthenticated, user, logout, web3, enableWeb3, isWeb3Enabled, Moralis } = useMoralis();
  const { switchNetwork, chainId, chain, account } = useChain();
  const [color, setColor] = useState("");
  const [contractAddress, setContractAddress] = useState("0x4FA6E34102D27997a16A19674225e6598565C8E7");
  const options = {
    contractAddress: contractAddress,
    abi: FlappyBirdABI,
  }; //console.log(user.get("ethAddress"));
  const Web3Api = useMoralisWeb3Api();

  const [flappysvgString, setFlappySVGString] = useState("");
  const [birdHash, setBirdHash] = useState("");
  const [metadataHash, setMetadataHash] = useState("");
  const prevFlappySVGString = useRef("");
  const prevBirdHash = useRef("");
  const prevMetadataHash = useRef("");

  // save the svg and upload the metadata to IPFS
  const { error: error1, isUploading: isUploading1, moralisFile: moralisFile1, saveFile: saveFile1 } = useMoralisFile();

  useEffect(() => {
    console.log("Triggered by change in flappysvgString");
    async function run() {
      if (flappysvgString !== "" && flappysvgString !== prevFlappySVGString.current && flappysvgString !== null) {
        prevFlappySVGString.current = flappysvgString;
        console.log(flappysvgString);
        const imageFile = { base64: window.btoa(flappysvgString) };
        console.log(imageFile);
        await saveFile1("Flappy.svg", imageFile, { saveIPFS: true });
      }
    }
    run();
  }, [flappysvgString]);

  useEffect(() => {
    if (moralisFile1 !== null && moralisFile1.hash !== "" && moralisFile1._hash !== prevBirdHash.current) {
      prevBirdHash.current = birdHash;
      setBirdHash("ipfs://" + moralisFile1._hash);
      console.log("Set bird hash");
    }
  }, [moralisFile1]);

  // save the metadata and upload to IPFS
  const { error: error2, isUploading: isUploading2, moralisFile: moralisFile2, saveFile: saveFile2 } = useMoralisFile();

  useEffect(() => {
    console.log("Triggered by change in birdHash");
    console.log(birdHash);
    if (birdHash !== null && birdHash !== "" && birdHash !== prevBirdHash.current) {
      console.log(birdHash);
      prevMetadataHash.current = metadataHash;
      const metadata = {
        name: "Flappy Bird",
        description: "One on the longest surviving flappy bird.",
        external_url: `Github.io/johnversus`,
        image: birdHash,
      };
      const metadataFile = { base64: window.btoa(JSON.stringify(metadata)) };
      saveFile2("metadata.json", metadataFile, { saveIPFS: true });
    }
  }, [birdHash]);

  useEffect(() => {
    if (moralisFile2 !== null) {
      setMetadataHash(moralisFile2._hash);
    }
  }, [moralisFile2]);

  // Mint the Metadata uri to the contract
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: FlappyBirdABI,
    contractAddress: contractAddress,
    functionName: "safeMint",
    params: {
      uri: metadataHash,
    },
  });

  useEffect(() => {
    console.log("Triggered by change in metadataHash");
    console.log(metadataHash);
    if (metadataHash !== "" && metadataHash !== null && prevMetadataHash.current !== metadataHash) {
      prevMetadataHash.current = metadataHash;
      console.log(metadataHash);
      fetch();
    }
  }, [metadataHash]);

  useEffect(() => {
    if (data !== null) {
      console.log(data);
    }
    if (error !== null) {
      console.log(error);
    }
    if (error1 !== null) {
      console.log(error1);
    }
    if (error2 !== null) {
      console.log(error2);
    }
  }, [data, error, error1, error2]);

  async function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    await setColor(color);
  }

  async function getSVG() {
    prevFlappySVGString.current = flappysvgString;
    setFlappySVGString("");
    const svg = document.getElementById("FlappySVG");
    const svgString = new XMLSerializer().serializeToString(svg);
    //console.log(svgString);
    setFlappySVGString(svgString);
    console.log("Set Flappy SVG String");
    //return svgString;
  }

  async function processUpload() {
    await getSVG();
    console.log("SvgGenereated");
  }
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
  } else if ("data") {
    // here exising player to be checked
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
              Function: processUpload, //function to be updated
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
  } else {
    // fetchAllTokenIds().then((e) => setContractData(e.result ? e.result : []));
    return (
      <div className="main CenterAll Vertical Spaces">
        <div className="MinterZone CenterAll " id="MinterZone">
          {/* only the owners flappy bird should appear from ipfs link */}
          <FlappyGenerator color={color} />
        </div>
        <MainButton
          MainName="Yow Own This"
          data={[
            {
              Function: "Visitgame", // function to be updated to redirect to game.
              FunctionParma: {},
              Name: "Visit game",
              ButtonStyle: "Normal",
            },
          ]}
        />
      </div>
    );
  }
}
export default App;
