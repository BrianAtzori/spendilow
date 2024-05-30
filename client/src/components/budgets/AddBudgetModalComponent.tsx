// ------ REACT ------
import React, { useRef, useEffect, SyntheticEvent, useState } from "react";

// ------ COMPONENTS & PAGES ------
import ErrorComponent from "../shared/ErrorComponent";

// ------ SERVICES ------
import { createNewSpendilowUserBudget } from "../../services/authenticated-users/budgets/auth-usr-budgets-external-calls";

// ------- TYPESCRIPT ------
import { SpendilowBudget } from "../../shared/interfaces";

interface AddBudgetModalProps {
  visible: boolean;
  onClose: (value: React.SetStateAction<boolean>) => void;
}

export default function AddBudgetModalComponent({
  visible,
  onClose,
}: AddBudgetModalProps) {
  // ------ HOOKS ------
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const [newSpendilowUserBudget, setSpendilowUserBudget] =
    useState<SpendilowBudget>({
      name: "",
      description: "",
    });

  const [isLoading, setIsLoading] = useState(false);

  const [budgetInputError, setBudgetInputError] = useState({
    state: false,
    message: "Errore in fase di creazione del budget.",
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpendilowUserBudget({
      ...newSpendilowUserBudget,
      [event.target.name]: event.target.value,
    });
  };

  async function verifyInputThenTriggerCreation(event: SyntheticEvent) {
    event.preventDefault();

    setBudgetInputError({
      state: false,
      message: "",
    });

    if (
      newSpendilowUserBudget.name === undefined ||
      newSpendilowUserBudget.description === undefined ||
      newSpendilowUserBudget.name === "" ||
      newSpendilowUserBudget.description === ""
    ) {
      setBudgetInputError({
        state: true,
        message: "Verifica i dati inseriti, alcuni campi sono vuoti!",
      });
    } else {
      setIsLoading(true);
      await addNewBudget();
    }
  }

  async function addNewBudget() {
    const externalCallResult: string = await createNewSpendilowUserBudget(
      newSpendilowUserBudget
    ).finally(() => {
      setIsLoading(false);
    });

    console.log(externalCallResult);

    window.location.href = import.meta.env.VITE_BASENAME + "/user/budget";
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
        <h1 className="font-primary font-bold">Aggiungi un nuovo budget 🐖</h1>
        <div className="divider font-primary divider-neutral opacity-50"></div>
        <div className="font-body text-sm">
          <p className="mb-2">
            Crea un nuovo budget e raggruppa le tue entrate per raggiungere un
            obiettivo, ti basterá aggiungere:
          </p>
          <ul className="list-disc">
            <li>Un titolo ✏️</li>
            <li>Una descrizione 💭</li>
          </ul>
          <p className="my-2">
            Una volta creato, potrai assegnare il budget alle transazioni giá
            create modificandolo, oppure potrai creare nuove transazioni
            aggiungendole a questo budget!
          </p>
        </div>
        <div className="divider font-primary divider-neutral opacity-50"></div>
        <div className="flex flex-col gap-4 font-heading desktop:flex-row desktop:flex-wrap desktop:justify-between">
          <div className="form-control desktop:w-5/12">
            <label className="label">
              <span className="label-text font-bold">Titolo</span>
            </label>
            <input
              className="input input-bordered"
              id="name"
              name="name"
              placeholder="Nuova auto"
              onChange={handleChange}
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
              placeholder="Quello che preferisci"
              onChange={handleChange}
            />
          </div>
          <div className="form-control desktop:w-full">
            {budgetInputError.state && (
              <ErrorComponent
                message={budgetInputError.message}
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
