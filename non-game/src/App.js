import React from "react";
import { useState } from "react";
import "./App.css";
import { useMoralis, useChain } from "react-moralis";
import MainButton from "./Component/Button/Button";
import FlappyGenerator from "./Component/FlappyGenerator/FlappyGenerator";

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

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    setColor(color);
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

  if (isAuthenticated && chainId !== "0x4") {
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
                FunctionParma: "0x4",
                Name: "To Rinkeby",
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
