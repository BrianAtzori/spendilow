// ------ REACT ------
import React from "react";
import { Routes, Route } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import Splash from "./pages/general/Splash";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <div className=" max-w-screen max-w-screen min-h-screen min-w-screen">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Splash />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
