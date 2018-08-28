import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Search from "./Search";
import NavBar from "./Navbar";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <br />
      <Search />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  rootElement
);
