import { useWeb3Contract } from "react-moralis";
import { FlappyBirdABI } from "../helpers/ABI";
import { useState } from "react";

function ReadContractfunction(props) {
  const [contractAddress, setContractAddress] = useState("0x4FA6E34102D27997a16A19674225e6598565C8E7");

  const { data, error, runContractFunction, isFetching, isLoading } = useWeb3Contract({
    abi: FlappyBirdABI,
    contractAddress: contractAddress,
    functionName: props.functionName,
    params: props.params,
  });

  return <>{data}</>;
}
export default ReadContractfunction;
