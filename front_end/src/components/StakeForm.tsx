import React from "react";
import { Token } from "./Main";
import { useNotifications } from "@usedapp/core";
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import useStakeTokens from "../hooks/useStakeTokens";
import { utils } from "ethers";

const StakeForm: React.FC<{ token: Token }> = ({ token }) => {
  const [amount, setAmount] = React.useState<number>(0);
  const [showApproval, setShowApproval] = React.useState<boolean>(false);
  const [showStakingApproval, setShowStakingApproval] =
    React.useState<boolean>(false);
  const { address } = token;
  const { approveTokenTransferAndStake, stakeErc20State, approveErc20State } =
    useStakeTokens(address);
  const { notifications } = useNotifications();
  const isMining =
    stakeErc20State.status === "Mining" ||
    approveErc20State.status === "Mining";

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
      setShowApproval(true);
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake tokens"
      ).length > 0
    ) {
      setShowStakingApproval(true);
    }
  }, [notifications]);

  return (
    <>
      <div>
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
          {isMining ? <CircularProgress color="primary" size={26} /> : "Stake"}
        </Button>
      </div>
      <Snackbar
        onClose={() => setShowApproval(false)}
        autoHideDuration={5000}
        open={showApproval}
      >
        <Alert severity="success" onClose={() => setShowApproval(false)}>
          ERC-20 token transfer approved! Now approve the staking transaction
          please!
        </Alert>
      </Snackbar>
      <Snackbar
        onClose={() => setShowStakingApproval(false)}
        autoHideDuration={5000}
        open={showStakingApproval}
      >
        <Alert severity="success" onClose={() => setShowStakingApproval(false)}>
          ERC-20 token staking completed!
        </Alert>
      </Snackbar>
    </>
  );
};

export default StakeForm;
