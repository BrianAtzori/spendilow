// ------ REACT ------
import React from "react";
import {Routes, Route } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import Splash from "./pages/general/Splash";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />}></Route>
      </Routes>
    </>
  );
}

export default App;
