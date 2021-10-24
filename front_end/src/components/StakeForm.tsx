import React from "react";
import { Token } from "./Main";
import { useEthers, useTokenBalance } from "@usedapp/core";
import { formatUnits } from "@ethersproject/units";
import { Button } from "@material-ui/core";

const StakeForm: React.FC<{ token: Token }> = ({ token }) => {
  const { account } = useEthers();
  const { address, name } = token;
  const tokenBalance = useTokenBalance(address, account);
  const formattedBalance: number = tokenBalance
    ? parseFloat(formatUnits(tokenBalance, 18))
    : 0;
  return <></>;
};

export default StakeForm;
