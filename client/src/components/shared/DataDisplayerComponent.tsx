// ------ REACT ------
import React, { useState } from "react";

// ------ PAGES & COMPONENTS ------
import NoResultsComponent from "./NoResultsComponent";
import TransactionsDisplayerComponent from "../transactions/TransactionsDisplayerComponent";
import LoaderComponent from "./LoaderComponent";
import ErrorComponent from "./ErrorComponent";

// ------ REDUX ------
import { useAppSelector } from "../../redux/hooks";

interface spendilowTransaction {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transaction_date: any;
  amount: number;
  title: string;
  notes: string;
  tags: string;
  transaction_type: string;
  target_id: string;
}

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

  //TODO: Puó diventare uno switch?
  const transactions: spendilowTransaction[] = useAppSelector(
    (state) => state.userTransactions.transactions
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
                      {transactions.length === 0 ? (
                        <>
                          <NoResultsComponent></NoResultsComponent>
                        </>
                      ) : (
                        <>
                          {displayerMode === "transactions" && (
                            <>
                              <p className="text-sm mb-4 tablet:hidden text-neutral-500 font-heading">
                                (☝🏼 Clicca su una transazione per visualizzarne
                                i dettagli e interagire)
                              </p>
                              <TransactionsDisplayerComponent
                                userTransactions={transactions}
                              ></TransactionsDisplayerComponent>
                            </>
                          )}
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
