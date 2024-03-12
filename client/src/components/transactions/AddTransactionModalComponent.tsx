// ------ REACT ------
import React, { useRef, useEffect, SyntheticEvent, useState } from "react";

// ------ COMPONENTS & PAGES ------
import ErrorComponent from "../shared/ErrorComponent";

// ------ SERVICES ------
import { createNewSpendilowUserTransaction } from "../../services/authenticated-users/transactions/auth-usr-transactions-external-calls";

// ------ TYPESCRIPT ------
/* eslint-disable @typescript-eslint/no-explicit-any */
interface spendilowTransactions {
  transaction_date: any;
  amount: number;
  title: string;
  notes: string;
  tags: string;
  transaction_type: string;
  target_id: string;
}

// ------ RESOURCES ------
// https://daisyui.com/components/modal/
// https://stackoverflow.com/questions/76955824/how-to-control-daisyui-modal-after-update-to-v3-in-reactjs
// https://stackoverflow.com/questions/40366407/typescript-modal-window

export default function AddTransactionModalComponent({
  visible,
  onClose,
}: any) {
  // ------ HOOKS ------
  const modalRef: any = useRef(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const [newSpendilowUserTransaction, setNewSpendilowUserTransaction] =
    useState<spendilowTransactions>({
      transaction_date: undefined,
      amount: 0,
      title: "",
      notes: "",
      tags: "",
      transaction_type: "Expense",
      target_id: "",
    });

  const [isLoading, setIsLoading] = useState(false);

  const [transactionInputError, setTransactionInputError] = useState({
    state: false,
    message: "Errore in fase di aggiunta della transazione.",
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
        ...newSpendilowUserTransaction,
        [event.target.name]: new Date(event.target.value),
      });
    } else {
      setNewSpendilowUserTransaction({
        ...newSpendilowUserTransaction,
        [event.target.name]: event.target.value,
      });
    }
  };

  async function verifyInputThenTriggerCreation(event: SyntheticEvent) {
    event.preventDefault();

    setTransactionInputError({
      state: false,
      message: "",
    });

    if (
      newSpendilowUserTransaction.transaction_date === undefined ||
      newSpendilowUserTransaction.amount === undefined ||
      newSpendilowUserTransaction.title === "" ||
      newSpendilowUserTransaction.transaction_type === ""
    ) {
      setTransactionInputError({
        state: true,
        message: "Verifica i dati inseriti, alcuni campi sono vuoti!",
      });
    } else {
      // if (newSpendilowUserTransaction.tags != "") {
      //   await manageTagsCreation()
      //     .then(() => {
      //       console.log(newSpendilowUserTransaction.tags);
      // addNewTransaction();
      //     })
      //     .finally(() => {
      //       setIsLoading(true);
      //     });
      // } else {
      //   console.log("No Tags");
      setIsLoading(true);
      await addNewTransaction();
    }
  }

  // ------ FUNCTIONS ------
  // async function manageTagsCreation() {
  //   const { tags } = newSpendilowUserTransaction;

  //   let formattedTags = "";

  //   if (tags.includes(",")) {
  //     const splittedTags = tags.split(",");

  //     for (let i = 0; i < splittedTags.length; i++) {
  //       if (i === splittedTags.length - 1 && splittedTags[i] != "") {
  //         formattedTags += splittedTags[i];
  //       } else {
  //         formattedTags += splittedTags[i] + ";";
  //       }
  //     }
  //   } else {
  //     setNewSpendilowUserTransaction({
  //       ...newSpendilowUserTransaction,
  //       ["tags"]: tags,
  //     });

  //     return;
  //   }

  //   setNewSpendilowUserTransaction({
  //     ...newSpendilowUserTransaction,
  //     ["tags"]: formattedTags,
  //   });

  //   return;
  // }

  async function addNewTransaction() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const externalCallResult: any = await createNewSpendilowUserTransaction(
      newSpendilowUserTransaction
    ).finally(() => {
      setIsLoading(false);
    });

    console.log(externalCallResult);

    window.location.href = "/user/dashboard";
  }

  return (
    <dialog
      ref={modalRef}
      id="insert_transaction_modal"
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
        onSubmit={verifyInputThenTriggerCreation}
      >
        <h1 className="font-primary font-bold">
          Aggiungi una nuova transazione 💰
        </h1>
        <div className="divider font-primary divider-neutral opacity-50"></div>
        <div className="font-body text-sm">
          <p className="mb-2">
            Crea un nuovo movimento e tieni traccia delle tue spese, ti basterá
            aggiungere:
          </p>
          <ul className="list-disc">
            <li>Un titolo ✏️</li>
            <li>Una data 📅</li>
            <li>
              Il tipo di transazione: se é una spesa, un'entrata o un'aggiunta
              💸
            </li>
            <li>
              E se ti va puoi aggiungere tutte le info che vuoi con note e tags!
              🏷️
            </li>
          </ul>
        </div>
        <div className="divider font-primary divider-neutral opacity-50"></div>
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
            />
          </div>
          <div className="form-control desktop:w-5/12">
            <label className="label">
              <span className="label-text font-bold">Quantitá</span>
            </label>
            <input
              className="input input-bordered"
              id="amount"
              name="amount"
              placeholder="0"
              onChange={handleChange}
              value={newSpendilowUserTransaction.amount}
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
              value={newSpendilowUserTransaction.transaction_type}
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
            />
          </div>
          <div className="form-control desktop:w-5/12">
            <label className="label">
              <span className="label-text font-bold">
                Tag (Separati da virgole)
              </span>
            </label>
            <input
              className="input input-bordered"
              id="tags"
              name="tags"
              placeholder="Casa,Feste,Famiglia"
              onChange={handleChange}
            />
          </div>
          <div className="form-control desktop:w-full">
            {transactionInputError.state && (
              <ErrorComponent
                message={transactionInputError.message}
              ></ErrorComponent>
            )}
          </div>
          <div className="form-control desktop:w-full">
            {isLoading ? (
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
                  value="Aggiungi"
                ></input>
              </>
            )}
          </div>
        </div>
      </form>
    </dialog>
  );
}
