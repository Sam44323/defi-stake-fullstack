import React from "react";
import { Token } from "./Main";
import { useNotifications } from "@usedapp/core";
import { Button, Input } from "@material-ui/core";
import useStakeTokens from "../hooks/useStakeTokens";
import { utils } from "ethers";

const StakeForm: React.FC<{ token: Token }> = ({ token }) => {
  const [amount, setAmount] = React.useState<number>(0);
  const { address } = token;
  const { approveTokenTransferAndStake, stakeErc20State } =
    useStakeTokens(address);
  const { notifications } = useNotifications();
  const isMining = stakeErc20State.status === "Mining";

  const handleSubmit = () => {
    const amountToStakeInWei = utils.parseEther(amount.toString()).toString();
    approveTokenTransferAndStake(amountToStakeInWei);
  };

  React.useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 transfer"
      ).length > 0
    ) {
      console.log("approved!");
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake tokens"
      ).length > 0
    ) {
      console.log("staked!");
    }
  }, [notifications]);

  return (
    <>
      <Input
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        type="number"
        inputProps={{ min: 0 }}
      />
      <Button
        color="primary"
        size="large"
        variant="contained"
        onClick={handleSubmit}
        disabled={isMining}
      >
        Stake
      </Button>
    </>
  );
};

export default StakeForm;
