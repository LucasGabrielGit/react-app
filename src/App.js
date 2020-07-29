import React, { Component } from "react";
import Header from "./components/Header";
import Main from "./pages/main";
import "./style.css";
import Routes from "./routes";

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
