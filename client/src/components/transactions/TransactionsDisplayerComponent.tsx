// ------ REACT ------
import React from "react";

// ------ REDUX ------
import { useAppDispatch } from "../../redux/hooks";
import {
  setTransactionMenuModalSliceShowing,
  setTransactionMenuModalSliceTransaction,
} from "../../redux/reducers/interactions/transactionMenuModalSlice";

// ------ SERVICES ------
import nextId from "react-id-generator";
import { deleteSpendilowUserTransaction } from "../../services/authenticated-users/transactions/auth-usr-transactions-external-calls";

// ------ TYPESCRIPT ------
interface spendilowTransaction {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transaction_date: any;
  amount: number;
  title: string;
  notes: string;
  tags: string;
  transaction_type: string;
  target_id: string;
}

type TransactionDisplayerProp = {
  userTransactions: spendilowTransaction[];
};

//A responsive table that render a set of transactions from props

export default function TransactionsDisplayerComponent({
  userTransactions,
}: TransactionDisplayerProp) {
  // ------ HOOKS ------
  const dispatch = useAppDispatch();

  // ------ DATA DISPLAY HANDLING ------
  const transactionTypeIconCreator = (type: string) => {
    switch (type) {
      case "Income":
        return (
          <svg
            className="w-6 h-6 text-success dark:text-success"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z"
              clipRule="evenodd"
            />
          </svg>
        );
        break;
      case "Expense":
        return (
          <svg
            className="w-6 h-6 text-error dark:text-error"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
              clipRule="evenodd"
            />
          </svg>
        );
        break;
      case "Budget":
        return (
          <svg
            className="w-6 h-6 text-info dark:text-info"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M12.3 3.3a1 1 0 0 1 1.4 0L16.4 6h-2.8l-1.3-1.3a1 1 0 0 1 0-1.4Zm.1 2.7L9.7 3.3a1 1 0 0 0-1.4 0L5.6 6h6.8ZM4.6 7A2 2 0 0 0 3 9v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.5-2h-13Z"
              clipRule="evenodd"
            />
          </svg>
        );
        break;
    }
  };

  const transactionMenuCreator = (transactionID: string) => {
    return (
      <ul className="menu menu-horizontal rounded-box bg-accent">
        <li className="tablet:table-cell">
          <button
            onClick={() => {
              dispatch(setTransactionMenuModalSliceShowing(true));
              dispatch(setTransactionMenuModalSliceTransaction(transactionID));
            }}
          >
            <a>
              <svg
                className="w-5 h-5 text-neutral dark:text-neutral"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </button>
        </li>
        <li className="hidden tablet:table-cell">
          <button
            onClick={() => {
              deleteTransaction(transactionID);
            }}
          >
            <svg
              className="w-5 h-5 text-neutral dark:text-neutral"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dateManipulation = (date: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let transformedDate: any = "string";

    transformedDate = date.split("T")[0];

    transformedDate = transformedDate.split("-");

    return (
      transformedDate[2] + "/" + transformedDate[1] + "/" + transformedDate[0]
    );
  };

  // ------ FUNCTIONS ------
  async function deleteTransaction(transactionID: string) {
    const response = confirm("Vuoi eliminare questa transazione?");

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalCallResult: any = await deleteSpendilowUserTransaction(
        transactionID
      );

      if (externalCallResult.success) {
        window.location.href = "/user/dashboard";
      } else {
        alert(externalCallResult);
      }
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="font-primary text-neutral">
            <tr className="border-accent">
              <th className="hidden desktop:table-cell">Data</th>
              <th>Tipo</th>
              <th>Titolo</th>
              <th className="hidden tablet:table-cell">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userTransactions.map((transaction: spendilowTransaction) => {
              return (
                <tr key={nextId()} className="font-body">
                  <td className="hidden desktop:table-cell">
                    {dateManipulation(transaction.transaction_date)}
                  </td>
                  <td>
                    {transactionTypeIconCreator(transaction.transaction_type)}
                  </td>
                  <td className="font-bold">{transaction.title}</td>
                  <td className="hidden tablet:table-cell ">
                    {transaction.amount}
                  </td>
                  <td className="text-right tablet:table-cell ">
                    {transactionMenuCreator(transaction.id)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
