import React from "react";
import { Token } from "./Main";
import { Box, Tab, makeStyles } from "@material-ui/core";
import { TabList, TabContext, TabPanel } from "@material-ui/lab";
import WalletBalance from "./WalletBalance";
import StakeForm from "./StakeForm";

const useStyles = makeStyles((theme) => ({
  tabContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  box: {
    backgroundColor: "white",
    borderRadius: "25px",
  },
  header: {
    color: "white",
  },
}));

const YourWallet: React.FC<{ supportedTokens: Array<Token> }> = ({
  supportedTokens,
}) => {
  const [selectedTokenIndex, setSelectedTokenIndex] = React.useState<number>(0);
  const classes = useStyles();

  return (
    <Box>
      <h1 className={classes.header}>Your Wallet</h1>
      <Box className={classes.box}>
        <TabContext value={selectedTokenIndex.toString()}>
          <TabList aria-label="stake form tabs">
            {supportedTokens.map((token, index) => (
              <Tab
                label={token.name}
                value={index.toString()}
                key={index}
                onClick={() => setSelectedTokenIndex(index)}
              />
            ))}
          </TabList>
          {supportedTokens.map((token, index) => (
            <TabPanel value={index.toString()} key={index}>
              <div className={classes.tabContent}>
                <WalletBalance token={token} />
                <StakeForm token={token} />
              </div>
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </Box>
  );
};

export default YourWallet;
