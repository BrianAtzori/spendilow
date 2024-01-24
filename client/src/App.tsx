// ------ REACT ------
import React from "react";
import { Routes, Route } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import Splash from "./pages/general/Splash";
import Header from "./components/shared/HeaderComponent";
import Footer from "./components/shared/FooterComponent";
import AuthForm from "./pages/auth/AuthForm";
import Dashboard from "./pages/user/Dashboard";

// ------ REDUX ------
import { useAppSelector } from "./redux/hooks";

function App() {
  const userLogged: boolean = useAppSelector(state => state.userLogged.value);

  return (
    <>
      {userLogged && <Header></Header>}
      <div className=" max-w-screen max-w-screen min-h-screen min-w-screen">
        <Routes>
          {/* LANDING & AUTH */}
          <Route path="/" element={<Splash />}></Route>
          <Route path="/auth/:mode" element={<AuthForm />}></Route>
          {/* USER GENERAL */}
          <Route path="/user/dashboard" element={<Dashboard />}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
