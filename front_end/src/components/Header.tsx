import React from "react";
import { useEthers } from "@usedapp/core";

const Header: React.FC = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  return <div>{account}</div>;
};

export default Header;
