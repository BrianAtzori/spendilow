// ------ REACT ------
import React, { useState } from "react";

// ------ PAGES & COMPONENTS ------
import NoResultsComponent from "./NoResultsComponent";
import TransactionsDisplayerComponent from "../transactions/TransactionsDisplayerComponent";
import LoaderComponent from "./LoaderComponent";
import ErrorComponent from "./ErrorComponent";

// ------ REDUX ------
import { useAppSelector } from "../../redux/hooks";
import BudgetDisplayerComponent from "../budgets/BudgetDisplayerComponent";

interface DataDisplayerComponentProps {
  title: string;
  subtitle: string;
  mode: string;
  // payload: object | object[];
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
}

//A responsive card to contain data or the no result component

export default function DataDisplayerComponent({
  title,
  subtitle,
  mode,
  isLoading,
  error,
  errorMessage,
}: DataDisplayerComponentProps) {
  // ------ HOOKS ------

  const [displayerMode] = useState(mode);

  //TODO: Quando avremo i budget lo trasformiamo in una funziona che ritorna quello che mi interessa o il componente che vogliamo renderizzare
  const transactions: SpendilowTransaction[] = useAppSelector(
    (state) => state.userTransactions.transactions
  );

  const budgets: SpendilowBudget[] = useAppSelector(
    (state) => state.userBudget.budgets
  );

  return (
    <>
      <div className="hero">
        <div className="hero-content flex-col gap-3 min-w-full ">
          <div className="shadow card card-body bg-base-100 w-full">
            {error ? (
              <>
                <ErrorComponent message={errorMessage}></ErrorComponent>
              </>
            ) : (
              <>
                <LoaderComponent
                  isLoading={!error && isLoading}
                  message={"Caricamento delle transazioni in corso 💰"}
                ></LoaderComponent>
                {!isLoading && (
                  <>
                    <h1 className="text-5xl font-bold font-primary">{title}</h1>
                    <div className="font-body">
                      <p className="">{subtitle}</p>
                    </div>
                    <div className="py-8">
                      {displayerMode === "transactions" ? (
                        transactions.length === 0 ? (
                          <>
                            <NoResultsComponent></NoResultsComponent>
                          </>
                        ) : (
                          <>
                            <p className="text-sm mb-4 tablet:hidden text-neutral-500 font-heading">
                              (☝🏼 Clicca su una transazione per visualizzarne i
                              dettagli e interagire)
                            </p>
                            <TransactionsDisplayerComponent
                              userTransactions={transactions}
                            ></TransactionsDisplayerComponent>
                          </>
                        )
                      ) : budgets.length === 0 ? (
                        <>
                          <NoResultsComponent></NoResultsComponent>
                        </>
                      ) : (
                        <>
                          <p className="text-sm mb-4 tablet:hidden text-neutral-500 font-heading">
                            (☝🏼 Clicca su una transazione per visualizzarne i
                            dettagli e interagire)
                          </p>
                          <BudgetDisplayerComponent
                            userBudgets={budgets}
                          ></BudgetDisplayerComponent>
                        </>
                      )}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
