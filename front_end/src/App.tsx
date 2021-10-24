import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Container } from "@material-ui/core";
import Main from "./components/Main";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </div>
  );
};

export default App;
