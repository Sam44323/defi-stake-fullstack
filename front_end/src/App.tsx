import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Container } from "@material-ui/core";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="md">hi</Container>
    </div>
  );
};

export default App;
