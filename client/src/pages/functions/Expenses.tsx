// ------ REACT ------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ------ PAGES & COMPONENTS ------
import UserExpensesWidgets from "../../components/user/UserExpensesWidgets";
import ErrorScreenComponent from "../../components/shared/ErrorScreenComponent";
import LoaderComponent from "../../components/shared/LoaderComponent";
import DataDisplayerComponent from "../../components/shared/DataDisplayerComponent";

// ------ REDUX ------
import { useAppDispatch } from "../../redux/hooks";
import { updateUserTransactions } from "../../redux/reducers/transactions/userTransactionsSlice";

// ------ SERVICES ------
import { getSpendilowUserTransactions } from "../../services/authenticated-users/transactions/auth-usr-transactions-external-calls";

export default function Expenses() {
  // ------ HOOKS ------

  const dispatch = useAppDispatch();

  const [transactionsLoading, setAreTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState({
    state: false,
    message: "Errore durante il caricamento delle tue transazioni.",
  });

  useEffect(() => {
    loadTransactions();
  });

  //------ FUNCTIONS ------
  async function loadTransactions() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const externalCallResult: any =
      await getSpendilowUserTransactions().finally(() => {
        setAreTransactionsLoading(false);
      });

    if (externalCallResult.transactions) {
      dispatch(updateUserTransactions(externalCallResult.transactions));
    } else {
      setTransactionsError({ state: true, message: externalCallResult[0] });
    }
  }

  return (
    <div className="min-h-screen static">
      <LoaderComponent
        isLoading={transactionsLoading}
        message={"Caricamento del profilo in corso 💰"}
      ></LoaderComponent>

      {transactionsError.state ? (
        <>
          <ErrorScreenComponent
            message={transactionsError["message"]}
          ></ErrorScreenComponent>
          <Link to="/">
            <button className="btn btn-accent font-primary bg-accent place-self-end fixed bottom-3 right-3 shadow">
              Torna alla home
            </button>
          </Link>
        </>
      ) : (
        <>
          <UserExpensesWidgets></UserExpensesWidgets>
          <div className="divider font-primary divider-neutral opacity-50 mx-8"></div>
          <DataDisplayerComponent
            title="Tutti i tuoi movimenti"
            subtitle="Ecco l'elenco di tutte le tue spese e delle tue entrate 💶"
            mode="transactions"
            isLoading={transactionsLoading}
            error={transactionsError.state}
            errorMessage={transactionsError.message}
          ></DataDisplayerComponent>
        </>
      )}
    </div>
  );
}
