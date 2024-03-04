// ------ REACT ------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ------ PAGES & COMPONENTS ------
import LoaderComponent from "../../components/shared/LoaderComponent";
import UserProfileWidgets from "../../components/user/UserProfileWidgets";

// ------ REDUX ------
import { useAppDispatch } from "../../redux/hooks";
import { changeUserLoggedState } from "../../redux/reducers/auth/userLoggedSlice";
import { updateUserProfile } from "../../redux/reducers/user/userProfileSlice";
import { updateUserTransactions } from "../../redux/reducers/transactions/userTransactionsSlice";

// ------ SERVICES ------
import { getSpendilowUserProfile } from "../../services/authenticated-users/authenticated-users-external-calls";
import ErrorScreenComponent from "../../components/shared/ErrorScreenComponent";
import DataDisplayerComponent from "../../components/shared/DataDisplayerComponent";
import { getSpendilowUserTransactions } from "../../services/authenticated-users/transactions/auth-usr-transactions-external-calls";

export default function Dashboard() {
  //------ HOOKS ------
  useEffect(() => {
    loadDashboard();
    loadTransactions();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [profileError, setProfileError] = useState({
    state: false,
    message: "Errore durante il caricamento del profilo",
  });

  const [transactionsLoading, setAreTransactionsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState({
    state: false,
    message: "Errore durante il caricamento delle tue transazioni.",
  });

  const dispatch = useAppDispatch();

  //------ FUNCTIONS ------
  async function loadDashboard() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const externalCallResult: any = await getSpendilowUserProfile().finally(
      () => {
        setIsLoading(false);
      }
    );

    if (typeof externalCallResult === "object") {
      dispatch(changeUserLoggedState(true));
      dispatch(updateUserProfile(externalCallResult));
    } else {
      setProfileError({ state: true, message: externalCallResult });
    }
  }

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
        isLoading={isLoading}
        message={"Caricamento del profilo in corso 💰"}
      ></LoaderComponent>

      {profileError.state ? (
        <>
          <ErrorScreenComponent
            message={profileError["message"]}
          ></ErrorScreenComponent>
          <Link to="/">
            <button className="btn btn-accent font-primary bg-accent place-self-end fixed bottom-3 right-3 shadow">
              Torna alla home
            </button>
          </Link>
        </>
      ) : (
        <>
          <UserProfileWidgets></UserProfileWidgets>
          <div className="divider font-primary divider-neutral opacity-50 mx-8"></div>
          <DataDisplayerComponent
            title="Le tue spese"
            subtitle="Dai un'occhiata alle spese degli ultimi 30 giorni 🗓️"
            mode="transactions"
            // payload={{}}
            isLoading={transactionsLoading}
            error={transactionsError.state}
            errorMessage={transactionsError.message}
          ></DataDisplayerComponent>
        </>
      )}
    </div>
  );
}
