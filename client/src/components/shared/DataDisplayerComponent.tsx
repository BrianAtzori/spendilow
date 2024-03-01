// ------ REACT ------
import React, { useState } from "react";

// ------ PAGES & COMPONENTS ------
import NoResultsComponent from "./NoResultsComponent";
import TransactionsDisplayerComponent from "../transactions/TransactionsDisplayerComponent";

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

//A responsive card to contain data or the no result component

export default function DataDisplayerComponent() {
  // ------ HOOKS ------
  const [noResults] = useState(true);

  const transactions: spendilowTransaction[] = useAppSelector(
    (state) => state.userTransactions.transactions
  );

  return (
    //TODO: Props should be:
    //? Titolo
    //? Sottotiolo
    //? Data to render or mode
    <>
      <div className="hero">
        <div className="hero-content flex-col gap-3 min-w-full ">
          <div className="shadow card card-body bg-base-100 w-full">
            <h1 className="text-5xl font-bold font-primary">Le tue spese</h1>
            <div className="font-body">
              <p className="">
                Dai un'occhiata alle spese degli ultimi 30 giorni 🗓️
              </p>
            </div>
            <div className="py-8">
              {!noResults ? (
                <>
                  <NoResultsComponent></NoResultsComponent>
                </>
              ) : (
                <>
                  <p className="text-sm mb-4 tablet:hidden text-neutral-500 font-heading">
                    (☝🏼 Clicca su una transazione per visualizzarne i dettagli e
                    interagire)
                  </p>
                  <TransactionsDisplayerComponent
                    userTransactions={transactions}
                  ></TransactionsDisplayerComponent>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
