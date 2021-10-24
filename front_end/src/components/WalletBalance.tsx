import { useEthers, useTokenBalance } from "@usedapp/core";
import React from "react";
import { Token } from "./Main";
import { formatUnits } from "@ethersproject/units";
import BalanceMsg from "./BalanceMsg";

export interface WalletBalanceProps {
  token: Token;
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ token }) => {
  const { image, address, name } = token;
  const { account } = useEthers();
  const tokenBalance = useTokenBalance(address, account);
  const formattedBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;
  return (
    <BalanceMsg
      label={`Your unstaked ${name} balance`}
      tokenImg={image}
      amount={formattedBalance}
    />
  );
};

export default WalletBalance;
