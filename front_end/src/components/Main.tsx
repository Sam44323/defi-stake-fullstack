import React from "react";
import { useEthers } from "@usedapp/core";
import helperConfig from "../helper-config.json";

type NetworkIDS = 1 | 4 | 42 | 1337;

const Main: React.FC = () => {
  const { chainId } = useEthers();
  const networkName = chainId ? helperConfig[chainId as NetworkIDS] : "";
  console.log(networkName);
  return <></>;
};

export default Main;
