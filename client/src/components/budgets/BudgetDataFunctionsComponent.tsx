// ------ REACT ------
import React, { useState } from "react";

// ------ PAGES & COMPONENTS
import ErrorComponent from "../shared/ErrorComponent";

// ------ SERVICES ------
import { deleteSpendilowUserBudget } from "../../services/authenticated-users/budgets/auth-usr-budgets-external-calls";

// ------ TYPESCRIPT ------
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function BudgetDataFunctionsComponent({
  budget,
  handleChange,
  isEditingLoading,
  budgetMenuEditingError,
  isFormVisible,
  setIsFormVisible,
}: any) {
  // ------ HOOKS ------
  const [isDeletionLoading, setIsLoading] = useState(false);

  const [budgetMenuDeletionError, setBudgetMenuDeletionError] = useState({
    state: false,
    message: "Errore in fase di eliminazione del budget.",
  });

  // ------ FUNCTIONS ------
  async function deleteBudget() {
    const response = confirm("Vuoi eliminare questo budget?");
    setIsLoading(true);

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalCallResult: any = await deleteSpendilowUserBudget(
        budget.id
      ).finally(() => {
        setIsLoading(false);
      });

      console.log(externalCallResult);

      if (externalCallResult.success) {
        window.location.href =
          import.meta.env.VITE_BASENAME + "/user/dashboard";
      } else {
        setBudgetMenuDeletionError({
          state: true,
          message: externalCallResult,
        });
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {isFormVisible && (
          <div className="form-control desktop:w-full">
            <div className="flex flex-col gap-4 font-heading desktop:flex-row desktop:flex-wrap desktop:justify-between">
              <div className="form-control desktop:w-5/12">
                <label className="label">
                  <span className="label-text font-bold">Nome</span>
                </label>
                <input
                  className="input input-bordered"
                  id="name"
                  name="name"
                  placeholder="Viaggio 2024"
                  onChange={handleChange}
                  value={budget.name}
                />
              </div>
              <div className="form-control desktop:w-5/12">
                <label className="label">
                  <span className="label-text font-bold">Descrizione</span>
                </label>
                <input
                  className="input input-bordered"
                  id="description"
                  name="description"
                  placeholder="Un viaggio bellissimo"
                  onChange={handleChange}
                  value={budget.description}
                />
              </div>
            </div>
          </div>
        )}
        <div className="form-control desktop:w-full">
          {budgetMenuEditingError.state && (
            <ErrorComponent
              message={budgetMenuEditingError.message}
            ></ErrorComponent>
          )}
        </div>
        <div className="form-control desktop:w-full">
          {isEditingLoading ? (
            <>
              <button className="btn btn-accent font-primary">
                <span className="loading loading-dots loading-md"></span>
              </button>
            </>
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-accent font-primary"
                value="Conferma modifiche"
              ></input>
            </>
          )}
        </div>

        {!isFormVisible && (
          <button
            className="btn btn-accent font-primary"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            Modifica il budget
          </button>
        )}

        <div className="form-control">
          {budgetMenuDeletionError.state && (
            <ErrorComponent
              message={budgetMenuDeletionError.message}
            ></ErrorComponent>
          )}
        </div>
        <div className="form-control desktop:w-full">
          {isDeletionLoading ? (
            <>
              <button className="btn btn-accent font-primary">
                <span className="loading loading-dots loading-md"></span>
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-accent font-primary"
                onClick={deleteBudget}
              >
                Elimina questo budget
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
