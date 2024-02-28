// ------ REACT ------
import React from "react";
import { Routes, Route } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import Splash from "./pages/general/Splash";
import Header from "./components/shared/HeaderComponent";
import Footer from "./components/shared/FooterComponent";
import AuthForm from "./pages/auth/AuthForm";
import Dashboard from "./pages/user/Dashboard";
import Settings from "./pages/user/Settings";
import Expenses from "./pages/functions/Expenses";
import Budget from "./pages/functions/Budget";

// ------ REDUX ------
import { useAppSelector } from "./redux/hooks";

function App() {
  const userLogged: boolean = useAppSelector((state) => state.userLogged.value);

  return (
    <>
      {userLogged && <Header></Header>}
      <div className="min-h-screen min-w-screen">
        <Routes>
          {/* LANDING & AUTH */}
          <Route path="/" element={<Splash />}></Route>
          <Route path="/auth/:mode" element={<AuthForm />}></Route>
          {/* USER */}
          <Route path="/user/dashboard" element={<Dashboard />}></Route>
          <Route path="/user/settings" element={<Settings></Settings>}></Route>
          {/* FUNCTIONS */}
          <Route path="/user/expenses" element={<Expenses />}></Route>
          <Route path="/user/budget" element={<Budget></Budget>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
