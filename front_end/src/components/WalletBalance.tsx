import { useEthers, useTokenBalance } from "@usedapp/core";
import React from "react";
import { Token } from "./Main";

export interface WalletBalanceProps {
  token: Token;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ token }) => {
  const { image, address, name } = token;
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(address, account);
  return <></>;
};

export default WalletBalance;
