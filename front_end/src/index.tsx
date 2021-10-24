import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChainId, DAppProvider } from "@usedapp/core";

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider
      config={{
        supportedChains: [ChainId.Kovan],
      }}
    >
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
