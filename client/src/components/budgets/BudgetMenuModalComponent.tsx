import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import LoaderComponent from "../shared/LoaderComponent";
import ErrorScreenComponent from "../shared/ErrorScreenComponent";
import { Link } from "react-router-dom";
import {
  editSpendilowUserBudget,
  getSpendilowUserBudget,
} from "../../services/authenticated-users/budgets/auth-usr-budgets-external-calls";
import TransactionsDisplayerComponent from "../transactions/TransactionsDisplayerComponent";
import NoResultsComponent from "../shared/NoResultsComponent";
import BudgetDataFunctionsComponent from "./BudgetDataFunctionsComponent";

interface SpendilowBudget {
  id?: string;
  name?: string;
  description?: string;
}

interface SpendilowBudgetAPIResponse {
  budget: SpendilowBudget;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transactions: any[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BudgetMenuModalComponent({ visible, onClose }: any) {
  // ------ HOOKS ------
  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
    getBudget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const currentBudgetId: string = useAppSelector(
    (state) => state.budgetMenuModal.budgetID
  );

  const [spendilowUserBudget, setSpendilowUserBudget] =
    useState<SpendilowBudgetAPIResponse>({
      budget: {
        id: "",
        name: "",
        description: "",
      },
      transactions: [],
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modalRef: any = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditingLoading, setIsEditingLoading] = useState(false);

  const [budgetMenuError, setBudgetMenuError] = useState({
    state: false,
    message: "Errore in fase di recupero del budget.",
  });
  const [budgetnMenuEditingError, setBudgetMenuEditingError] = useState({
    state: false,
    message: "Errore in fase di modifica del budget.",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    setSpendilowUserBudget({
      ...spendilowUserBudget,
      budget: {
        ...spendilowUserBudget.budget,
        [event.target.name]: event.target.value,
      },
    });
  };

  async function verifyInputThenTriggerEditing(event: SyntheticEvent) {
    event.preventDefault();

    setBudgetMenuEditingError({
      state: false,
      message: "",
    });

    if (
      spendilowUserBudget.budget.name === undefined ||
      spendilowUserBudget.budget.description === undefined ||
      spendilowUserBudget.budget.name === "" ||
      spendilowUserBudget.budget.description === ""
    ) {
      setBudgetMenuEditingError({
        state: true,
        message: "Verifica i dati inseriti, alcuni campi sono vuoti!",
      });
    } else {
      await editBudget();
    }
  }
  // ------ FUNCTIONS ------
  async function getBudget() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const externalCallResult: any = await getSpendilowUserBudget(
      currentBudgetId
    ).finally(() => {
      setIsLoading(false);
    });

    if (externalCallResult.budget && externalCallResult.transactions) {
      setSpendilowUserBudget(externalCallResult);
    } else {
      setBudgetMenuError({ state: true, message: externalCallResult });
    }
  }

  async function editBudget() {
    const response = confirm("Vuoi modificare il budget?");
    setIsLoading(true);

    const { id, name, description } = spendilowUserBudget.budget;

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalCallResult: any = await editSpendilowUserBudget({
        id,
        name,
        description,
      }).finally(() => {
        setIsEditingLoading(false);
      });

      console.log(externalCallResult);

      if (externalCallResult.success) {
        window.location.href =
          import.meta.env.VITE_BASENAME + "/user/dashboard";
      } else {
        setBudgetMenuEditingError({
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
          message={"Modifica del budget in corso 💰"}
        ></LoaderComponent>
        {budgetMenuError.state ? (
          <>
            <ErrorScreenComponent
              message={budgetMenuError["message"]}
            ></ErrorScreenComponent>
            <Link to="/">
              <button className="btn btn-accent font-primary bg-accent place-self-end fixed bottom-3 right-3 shadow">
                Torna alla home
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-2 justify-between align-middle">
              <div className="flex flex-row gap-2 justify-start align-middle">
                <h1 className="font-primary font-bold">
                  {spendilowUserBudget.budget.name}
                </h1>
              </div>
            </div>
            <div className="divider font-primary divider-neutral opacity-50"></div>
            <div className="font-body text-sm">
              <label className="label">
                <span className="label-text font-bold">Descrizione:</span>
              </label>
              <p className="mb-2">{spendilowUserBudget.budget.description}</p>
              <label className="label">
                <span className="label-text font-bold">Totale:</span>
              </label>
              <div className="flex flex-row flex-wrap justify-start">0.0</div>
              <div className="divider font-primary divider-neutral opacity-50"></div>
              {!isFormVisible ? (
                <>
                  <label className="label">
                    <span className="label-text font-bold">Transazioni:</span>
                  </label>
                  {spendilowUserBudget.transactions.length === 0 ? (
                    <>
                      <NoResultsComponent></NoResultsComponent>
                    </>
                  ) : (
                    <TransactionsDisplayerComponent
                      userTransactions={spendilowUserBudget.transactions}
                    ></TransactionsDisplayerComponent>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
        <BudgetDataFunctionsComponent
          budget={spendilowUserBudget.budget}
          handleChange={handleChange}
          isEditingLoading={isEditingLoading}
          budgetMenuEditingError={budgetnMenuEditingError}
          isFormVisible={isFormVisible}
          setIsFormVisible={setIsFormVisible}
        ></BudgetDataFunctionsComponent>
      </form>
    </dialog>
  );
}
