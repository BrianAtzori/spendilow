// ------ REACT ------
import React, { useRef, useEffect, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import ErrorScreenComponent from "../shared/ErrorScreenComponent";
import LoaderComponent from "../shared/LoaderComponent";
import TransactionDataComponent from "./transaction-menu-modal-components/TransactionDataComponent";
import TransactionDataFunctionsComponent from "./transaction-menu-modal-components/TransactionDataFunctionsComponent";

// ------ REDUX ------
import { useAppSelector } from "../../redux/hooks";

// ------ SERVICES ------
import { getSpendilowUserTransaction } from "../../services/authenticated-users/transactions/auth-usr-transactions-external-calls";
import { editSpendilowUserTransaction } from "../../services/authenticated-users/transactions/auth-usr-transactions-external-calls";

// ------ TYPESCRIPT ------
/* eslint-disable @typescript-eslint/no-explicit-any */
interface SpendilowTransactions {
  id: string;
  transaction_date: Date;
  amount: number;
  title: string;
  notes: string;
  tags: string;
  transaction_type: string;
  target_id: string;
}

export default function TransactionMenuModalComponent({
  visible,
  onClose,
}: any) {
  // ------ HOOKS ------
  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
    getTransaction();
  }, [visible]);

  const currentTransactionID: string = useAppSelector(
    (state) => state.transactionMenuModal.transactionID
  );

  const [spendilowUserTransaction, setNewSpendilowUserTransaction] =
    useState<SpendilowTransactions>({
      id: "",
      transaction_date: new Date(),
      amount: 0,
      title: "",
      notes: "",
      tags: "",
      transaction_type: "Expense",
      target_id: "",
    });

  const modalRef: any = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const [transactionMenuError, setTransactionMenuError] = useState({
    state: false,
    message: "Errore in fase di aggiunta della transazione.",
  });

  const [isEditingLoading, setIsEditingLoading] = useState(false);

  const [transactionMenuEditingError, setTransactionMenuEditingError] =
    useState({
      state: false,
      message: "Errore in fase di modifica della transazione.",
    });

  // ------ DIALOG HANDLING ------
  const handleClose = () => {
    if (onClose) {
      onClose(false); //Update Show Dialog State
    }
  };

  const handleESC = (event: SyntheticEvent) => {
    event.preventDefault();
    handleClose();
  };

  // ------ FORM HANDLING ------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    if (event.target.name === "transaction_date") {
      setNewSpendilowUserTransaction({
        ...spendilowUserTransaction,
        [event.target.name]: new Date(event.target.value),
      });
    } else {
      setNewSpendilowUserTransaction({
        ...spendilowUserTransaction,
        [event.target.name]: event.target.value,
        transaction_date: new Date(spendilowUserTransaction.transaction_date),
      });
    }
  };

  async function verifyInputThenTriggerEditing(event: SyntheticEvent) {
    event.preventDefault();

    setTransactionMenuError({
      state: false,
      message: "",
    });

    if (
      spendilowUserTransaction.transaction_date === undefined ||
      spendilowUserTransaction.amount === undefined ||
      spendilowUserTransaction.title === "" ||
      spendilowUserTransaction.transaction_type === "" ||
      spendilowUserTransaction.transaction_date === null
    ) {
      setTransactionMenuEditingError({
        state: true,
        message: "Verifica i dati inseriti, alcuni campi sono vuoti!",
      });
    } else {
      await editTransaction();
    }
  }

  // ------ FUNCTIONS ------
  async function getTransaction() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const externalCallResult: any = await getSpendilowUserTransaction(
      currentTransactionID
    ).finally(() => {
      setIsLoading(false);
    });

    if (externalCallResult.transaction) {
      setNewSpendilowUserTransaction(externalCallResult.transaction);
    } else {
      setTransactionMenuError({ state: true, message: externalCallResult });
    }
  }

  async function editTransaction() {
    const response = confirm("Vuoi modificare la transazione?");
    setIsLoading(true);

    const {
      id,
      amount,
      title,
      notes,
      tags,
      target_id,
      transaction_date,
      transaction_type,
    } = spendilowUserTransaction;

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalCallResult: any = await editSpendilowUserTransaction({
        id,
        amount,
        title,
        notes,
        tags,
        target_id,
        transaction_date,
        transaction_type,
      }).finally(() => {
        setIsEditingLoading(false);
      });

      console.log(externalCallResult);

      if (externalCallResult.success) {
        window.location.href =
          import.meta.env.VITE_BASENAME + "/user/dashboard";
      } else {
        setTransactionMenuEditingError({
          state: true,
          message: externalCallResult,
        });
      }
    } else {
      setIsEditingLoading(false);
    }
  }

  return (
    <dialog
      ref={modalRef}
      id="menu_transaction_modal"
      className="modal"
      onCancel={handleESC}
    >
      <button
        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-base-100"
        onClick={handleClose}
      >
        ✕
      </button>
      <form
        method="dialog"
        className="modal-box"
        onSubmit={verifyInputThenTriggerEditing}
      >
        <LoaderComponent
          isLoading={isLoading}
          message={"Modifica della transazione in corso 💰"}
        ></LoaderComponent>
        {transactionMenuError.state ? (
          <>
            <ErrorScreenComponent
              message={transactionMenuError["message"]}
            ></ErrorScreenComponent>
            <Link to="/">
              <button className="btn btn-accent font-primary bg-accent place-self-end fixed bottom-3 right-3 shadow">
                Torna alla home
              </button>
            </Link>
          </>
        ) : (
          <>
            <TransactionDataComponent
              transaction={spendilowUserTransaction}
            ></TransactionDataComponent>
            <TransactionDataFunctionsComponent
              transaction={spendilowUserTransaction}
              handleChange={handleChange}
              isEditingLoading={isEditingLoading}
              transactionMenuEditingError={transactionMenuEditingError}
            ></TransactionDataFunctionsComponent>
          </>
        )}
      </form>
    </dialog>
  );
}
