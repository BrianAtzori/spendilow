// ------ REACT ------
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import Splash from "./pages/general/Splash";
import Header from "./components/shared/HeaderComponent";
import Footer from "./components/shared/FooterComponent";
import AuthForm from "./pages/auth/AuthForm";
import Dashboard from "./pages/user/Dashboard";
import Settings from "./pages/user/Settings";
import Expenses from "./pages/functions/Expenses";
import Budget from "./pages/functions/Budget";
import FloatingMenuComponent from "./components/shared/FloatingMenuComponent";
import AddTransactionModalComponent from "./components/transactions/AddTransactionModalComponent";
import TransactionMenuModalComponent from "./components/transactions/TransactionMenuModalComponent";

// ------ REDUX ------
import { useAppSelector } from "./redux/hooks";
import { useAppDispatch } from "./redux/hooks";
import { setTransactionModalShowing } from "./redux/reducers/interactions/transactionModalSlice";
import { setTransactionMenuModalSliceShowing } from "./redux/reducers/interactions/transactionMenuModalSlice";
import ErrorScreenComponent from "./components/shared/ErrorScreenComponent";

function App() {
  // ------ HOOKS ------
  const userLogged: boolean = useAppSelector((state) => state.userLogged.value);
  const modalShowing: boolean = useAppSelector(
    (state) => state.transactionModal.isShowing
  );
  const menuTransactionsShowing: boolean = useAppSelector(
    (state) => state.transactionMenuModal.isShowing
  );

  const dispatch = useAppDispatch();

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
          {/* 404 */}
          <Route
            path="*"
            element={
              <>
                <ErrorScreenComponent
                  message={"Pagina non trovata"}
                ></ErrorScreenComponent>
                <Link to="/">
                  <button className="btn btn-accent font-primary bg-accent place-self-end fixed bottom-3 right-3 shadow">
                    Torna alla home
                  </button>
                </Link>
              </>
            }
          ></Route>
        </Routes>
        {userLogged && <FloatingMenuComponent></FloatingMenuComponent>}
        {modalShowing && userLogged && (
          <AddTransactionModalComponent
            visible={modalShowing}
            onClose={() => dispatch(setTransactionModalShowing(false))}
          ></AddTransactionModalComponent>
        )}
        {menuTransactionsShowing && userLogged && (
          <TransactionMenuModalComponent
            visible={menuTransactionsShowing}
            onClose={() => dispatch(setTransactionMenuModalSliceShowing(false))}
          ></TransactionMenuModalComponent>
        )}
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;
