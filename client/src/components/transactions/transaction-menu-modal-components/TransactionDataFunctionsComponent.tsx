// ------ REACT ------
import React, { useState } from "react";

// ------ PAGES & COMPONENTS
import ErrorComponent from "../../shared/ErrorComponent";

// ------ SERVICES ------
import { deleteSpendilowUserTransaction } from "../../../services/authenticated-users/transactions/auth-usr-transactions-external-calls";

// ------ TYPESCRIPT ------
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TransactionDataFunctionsComponent({
  transaction,
  handleChange,
  isEditingLoading,
  transactionMenuEditingError,
}: any) {
  // ------ HOOKS ------
  const [isDeletionLoading, setIsLoading] = useState(false);

  const [transactionMenuDeletionError, setTransactionMenuDeletionError] =
    useState({
      state: false,
      message: "Errore in fase di eliminazione della transazione.",
    });

  const [isFormVisible, setIsFormVisible] = useState(false);

  // ------ FUNCTIONS ------
  async function deleteTransaction() {
    const response = confirm("Vuoi eliminare questa transazione?");
    setIsLoading(true);

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalCallResult: any = await deleteSpendilowUserTransaction(
        transaction.id
      ).finally(() => {
        setIsLoading(false);
      });

      console.log(externalCallResult);

      if (externalCallResult.success) {
        window.location.href = "/user/dashboard";
      } else {
        setTransactionMenuDeletionError({
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
                  <span className="label-text font-bold">Titolo</span>
                </label>
                <input
                  className="input input-bordered"
                  id="title"
                  name="title"
                  placeholder="Supermercato"
                  onChange={handleChange}
                  value={transaction.title}
                />
              </div>
              <div className="form-control desktop:w-5/12">
                <label className="label">
                  <span className="label-text font-bold">Data</span>
                </label>
                <input
                  className="input input-bordered"
                  type="date"
                  id="transaction_date"
                  name="transaction_date"
                  placeholder="1970/01/01"
                  onChange={handleChange}
                />
              </div>
              <div className="form-control desktop:w-5/12">
                <label className="label">
                  <span className="label-text font-bold">Tipo di spesa</span>
                </label>
                <select
                  className="input input-bordered"
                  id="transaction_type"
                  name="transaction_type"
                  placeholder="Spesa"
                  onChange={handleChange}
                  value={transaction.transaction_type}
                >
                  <option value="Income">Entrata</option>
                  <option value="Expense">Spesa</option>
                  <option value="Budget">A Budget</option>
                </select>
              </div>
              <div className="form-control desktop:w-5/12">
                <label className="label">
                  <span className="label-text font-bold">Note</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  id="notes"
                  name="notes"
                  placeholder="Extra spesa di Natale"
                  onChange={handleChange}
                  value={transaction.notes}
                />
              </div>
              <div className="form-control desktop:w-5/12">
                <label className="label">
                  <span className="label-text font-bold">Tag</span>
                </label>
                <input
                  className="input input-bordered"
                  id="tags"
                  name="tags"
                  placeholder="Casa,Feste,Famiglia"
                  onChange={handleChange}
                  value={transaction.tags}
                />
              </div>
              <div className="form-control desktop:w-full">
                {transactionMenuEditingError.state && (
                  <ErrorComponent
                    message={transactionMenuEditingError.message}
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
            </div>
          </div>
        )}

        {!isFormVisible && (
          <button
            className="btn btn-accent font-primary"
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            Modifica la transazione
          </button>
        )}

        <div className="form-control">
          {transactionMenuDeletionError.state && (
            <ErrorComponent
              message={transactionMenuDeletionError.message}
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
                onClick={deleteTransaction}
              >
                Elimina questa transazione
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
