import React from "react";
import { Token } from "./Main";
import { Box, Tab } from "@material-ui/core";
import { TabList, TabContext, TabPanel } from "@material-ui/lab";

const YourWallet: React.FC<{ supportedTokens: Array<Token> }> = ({
  supportedTokens,
}) => {
  const [selectedTokenIndex, setSelectedTokenIndex] = React.useState<number>(0);

  return (
    <Box>
      <h1>Your Wallet</h1>
      <Box>
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
        </TabContext>
      </Box>
    </Box>
  );
};

export default YourWallet;
