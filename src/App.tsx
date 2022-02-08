import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Wheel } from "./components/Wheel";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="flex items-center">
          <Wheel />
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
