// ------ REACT ------
import React from "react";
import { Routes, Route } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import Splash from "./pages/general/Splash";
import Header from "./components/shared/HeaderComponent";
import Footer from "./components/shared/FooterComponent";
import AuthForm from "./pages/auth/AuthForm";

function App() {
  return (
    <div className=" max-w-screen max-w-screen min-h-screen min-w-screen">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Splash />}></Route>
        <Route path="/auth/:mode" element={<AuthForm />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
