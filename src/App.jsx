import React from "react";
import Bio from "./components/Bio";
import Gallery from "./components/Gallery";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Bio />
        <Gallery />
      </div>
    </>
  );
}

export default App;
