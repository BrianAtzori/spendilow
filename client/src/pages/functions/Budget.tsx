import React, { useEffect, useState } from "react";
import UserBudgetsWidgets from "../../components/user/UserBudgetsWidgets";
import { getSpendilowUserBudgets } from "../../services/authenticated-users/budgets/auth-usr-budgets-external-calls";
import { useAppDispatch } from "../../redux/hooks";
import { updateUserBudgets } from "../../redux/reducers/budgets/userBudgetSlice";
import { Link } from "react-router-dom";
import DataDisplayerComponent from "../../components/shared/DataDisplayerComponent";
import ErrorScreenComponent from "../../components/shared/ErrorScreenComponent";
import LoaderComponent from "../../components/shared/LoaderComponent";

export default function Budget() {
  const dispatch = useAppDispatch();

  const [budgetsLoading, setAreBudgetsLoading] = useState(true);
  const [budgetsError, setBudgetsError] = useState({
    state: false,
    message: "Errore durante il caricamento dei tuoi budget.",
  });

  useEffect(() => {
    loadBudgets();
  }, []);

  async function loadBudgets() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const externalCallResult: any = await getSpendilowUserBudgets().finally(
      () => {
        setAreBudgetsLoading(false);
      }
    );

    if (externalCallResult.budgets) {
      dispatch(updateUserBudgets(externalCallResult.budgets));
    } else {
      setBudgetsError({ state: true, message: externalCallResult[0] });
    }
  }

  return (
    <>
      <div className="min-h-screen static">
        <LoaderComponent
          isLoading={budgetsLoading}
          message={"Caricamento del profilo in corso 💰"}
        ></LoaderComponent>

        {budgetsError.state ? (
          <>
            <ErrorScreenComponent
              message={budgetsError["message"]}
            ></ErrorScreenComponent>
            <Link to="/">
              <button className="btn btn-accent font-primary bg-accent place-self-end fixed bottom-3 right-3 shadow">
                Torna alla home
              </button>
            </Link>
          </>
        ) : (
          <>
            <UserBudgetsWidgets></UserBudgetsWidgets>
            <DataDisplayerComponent
              title="Elenco"
              subtitle="Ecco i budget, lo strumento con cui puoi porti degli obiettivi finanziari 💸"
              mode="budgets"
              isLoading={budgetsLoading}
              error={budgetsError.state}
              errorMessage={budgetsError.message}
            ></DataDisplayerComponent>
          </>
        )}
      </div>
    </>
  );
}
