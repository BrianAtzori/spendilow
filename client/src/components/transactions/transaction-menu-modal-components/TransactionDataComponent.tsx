// ------ REACT ------
import React from "react";

// ------ TYPESCRIPT ------
/* eslint-disable @typescript-eslint/no-explicit-any */
interface spendilowTransactions {
  id: string;
  transaction_date: any;
  amount: number;
  title: string;
  notes: string;
  tags: string;
  transaction_type: string;
  target_id: string;
}

export default function TransactionDataComponent({ transaction }: any) {
  // ------ DATA DISPLAY HANDLING ------//TODO: Metodi generali e importati?
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

  return (
    <>
      <div className="flex flex-row gap-2 justify-between align-middle">
        <div className="flex flex-row gap-2 justify-start align-middle">
          <span>
            {transactionTypeIconCreator(transaction.transaction_type)}
          </span>
          <h1 className="font-primary font-bold">{transaction.title}</h1>
        </div>
        <span className="text-neutral font-heading">
          {/* //TODO: Check render Data */}
          {/* {dateManipulation(spendilowUserTransaction.transaction_date)} */}
        </span>
      </div>
      <div className="divider font-primary divider-neutral opacity-50"></div>
      <div className="font-body text-sm">
        <p className="mb-2">{transaction.notes}</p>
        {/* //TODO: Render Tags */}
        <div className="badge badge-primary mx-2">{transaction.tags}</div>
      </div>
      <div className="divider font-primary divider-neutral opacity-50"></div>
    </>
  );
}
