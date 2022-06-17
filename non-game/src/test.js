import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import console from "console";
import { useChain, useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";

function Test() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    logout,
    web3,
    enableWeb3,
    isWeb3Enabled,
    Moralis,
  } = useMoralis();
  const { switchNetwork, chainId, chain, account } = useChain();
  const [contractAddress, setContractAddress] = useState(
    "0x36d53FB0c43a124a7b0f4a23E80C1a3980E67dCB"
  );
  const [abi, setAbi] = useState([
    {
      inputs: [],
      name: "data",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ]);
  function changeChain() {
    switchNetwork("0x13881");
  }
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "data",
  });

  useEffect(() => {
    if (isWeb3Enabled) {
      fetch();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);
  useEffect(() => {
    if (web3) {
      console.log(web3._isProvider);
    }
  }, [web3]);

  if (!isAuthenticated) {
    return (
      <div>
        <button onClick={() => authenticate()}>Login</button>
      </div>
    );
  }

  if (isAuthenticated && chainId !== "0x13881") {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
    return <button onClick={changeChain}>Switch Network</button>;
  } else if (isWeb3Enabled && chainId === "0x13881") {
    return (
      <div>
        <div>The data from contract: {data}</div>
        <button onClick={logout}>logout</button>
      </div>
    );
  }
}
export default Test;
