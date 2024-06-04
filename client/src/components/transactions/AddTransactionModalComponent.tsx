// ------ REACT ------
import React, { useRef, useEffect, SyntheticEvent, useState, ChangeEvent } from 'react';

// ------ COMPONENTS & PAGES ------
import ErrorComponent from '../shared/ErrorComponent';

// ------ SERVICES ------
import { createNewSpendilowUserTransaction } from '../../services/authenticated-users/transactions/auth-usr-transactions-external-calls';
import { getSpendilowUserBudgets } from '../../services/authenticated-users/budgets/auth-usr-budgets-external-calls';
import { updateUserBudgets } from '../../redux/reducers/budgets/userBudgetSlice';
import LoaderComponent from '../shared/LoaderComponent';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import nextId from 'react-id-generator';
import { ExternalCallResult, SpendilowTransaction } from '../../shared/interfaces';
import { changeUserLoggedState } from '../../redux/reducers/auth/userLoggedSlice';

// ------ RESOURCES ------
// https://daisyui.com/components/modal/
// https://stackoverflow.com/questions/76955824/how-to-control-daisyui-modal-after-update-to-v3-in-reactjs
// https://stackoverflow.com/questions/40366407/typescript-modal-window

// ------ TYPESCRIPT ------
interface AddTransactionModalProps {
  visible: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose: (value: React.SetStateAction<boolean>) => void;
}

export default function AddTransactionModalComponent({
  visible,
  onClose,
}: AddTransactionModalProps) {
  // ------ HOOKS ------

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  useEffect(() => {
    getAvailableBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [areAvailableBudgetsLoading, setAreAvailableBudgetsLoading] = useState(true);

  const [budgetsError, setBudgetsError] = useState({
    state: false,
    message: 'Errore durante il caricamento dei tuoi budget.',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [transactionInputError, setTransactionInputError] = useState({
    state: false,
    message: 'Errore in fase di aggiunta della transazione.',
  });

  const [newSpendilowUserTransaction, setNewSpendilowUserTransaction] =
    useState<SpendilowTransaction>({
      transaction_date: new Date(),
      amount: 0,
      title: '',
      notes: '',
      tags: '',
      transaction_type: 'Expense',
      target_id: null,
    });

  const availableBudgets = useAppSelector((state) => state.userBudget.budgets);

  const dispatch = useDispatch();

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
  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (event.target.name === 'transaction_date') {
      setNewSpendilowUserTransaction({
        ...newSpendilowUserTransaction,
        [event.target.name]: new Date(event.target.value),
      });
    }
    if (event.target.name === 'target_id') {
      setNewSpendilowUserTransaction({
        ...newSpendilowUserTransaction,
        [event.target.name]: event.target.value,
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
      message: '',
    });

    if (
      newSpendilowUserTransaction.transaction_date === undefined ||
      newSpendilowUserTransaction.amount === undefined ||
      newSpendilowUserTransaction.title === '' ||
      newSpendilowUserTransaction.transaction_type === ''
    ) {
      setTransactionInputError({
        state: true,
        message: 'Verifica i dati inseriti, alcuni campi sono vuoti!',
      });
    } else {
      setIsLoading(true);
      await addNewTransaction();
    }
  }

  // ------ FUNCTIONS ------
  async function getAvailableBudgets() {
    const externalCallResult: ExternalCallResult | string = await getSpendilowUserBudgets().finally(
      () => {
        setAreAvailableBudgetsLoading(false);
      },
    );

    if ((externalCallResult as ExternalCallResult).budgets) {
      dispatch(updateUserBudgets((externalCallResult as ExternalCallResult).budgets));
      dispatch(changeUserLoggedState(true));
      //TODO: Manage success
    } else {
      setBudgetsError({
        state: true,
        message: externalCallResult as string,
      });
    }
  }

  async function addNewTransaction() {
    await createNewSpendilowUserTransaction(newSpendilowUserTransaction).finally(() => {
      setIsLoading(false);
    });

    //TODO: Manage success

    window.location.href = import.meta.env.VITE_BASENAME + '/user/dashboard';
  }

  return (
    <dialog ref={modalRef} id='insert_transaction_modal' className='modal' onCancel={handleESC}>
      <button
        className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-base-100'
        onClick={handleClose}
      >
        ✕
      </button>
      {areAvailableBudgetsLoading ? (
        <LoaderComponent
          isLoading={areAvailableBudgetsLoading}
          message={'Caricamento Budget disponibili'}
        ></LoaderComponent>
      ) : (
        <form method='dialog' className='modal-box' onSubmit={verifyInputThenTriggerCreation}>
          <h1 className='font-primary font-bold'>Aggiungi una nuova transazione 💰</h1>
          <div className='divider font-primary divider-neutral opacity-50'></div>
          <div className='font-body text-sm'>
            <p className='mb-2'>
              Crea un nuovo movimento e tieni traccia delle tue spese, ti basterá aggiungere:
            </p>
            <ul className='list-disc'>
              <li>Un titolo ✏️</li>
              <li>Una data 📅</li>
              <li>Il tipo di transazione: se é una spesa, un'entrata o un'aggiunta 💸</li>
              <li>E se ti va puoi aggiungere tutte le info che vuoi con note e tags! 🏷️</li>
            </ul>
          </div>
          <div className='divider font-primary divider-neutral opacity-50'></div>
          <div className='flex flex-col gap-4 font-heading desktop:flex-row desktop:flex-wrap desktop:justify-between'>
            {budgetsError.state ? (
              <ErrorComponent message={budgetsError.message}></ErrorComponent>
            ) : (
              <>
                <div className='form-control desktop:w-5/12'>
                  <label className='label'>
                    <span className='label-text font-bold'>Titolo</span>
                  </label>
                  <input
                    className='input input-bordered'
                    id='title'
                    name='title'
                    placeholder='Supermercato'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-control desktop:w-5/12'>
                  <label className='label'>
                    <span className='label-text font-bold'>Quantitá</span>
                  </label>
                  <input
                    className='input input-bordered'
                    id='amount'
                    name='amount'
                    placeholder='0'
                    onChange={handleChange}
                    value={newSpendilowUserTransaction.amount}
                  />
                </div>
                <div className='form-control desktop:w-5/12'>
                  <label className='label'>
                    <span className='label-text font-bold'>Data</span>
                  </label>
                  <input
                    className='input input-bordered'
                    type='date'
                    id='transaction_date'
                    name='transaction_date'
                    placeholder='1970/01/01'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-control desktop:w-5/12'>
                  <label className='label'>
                    <span className='label-text font-bold'>Tipo di spesa</span>
                  </label>
                  <select
                    className='input input-bordered'
                    id='transaction_type'
                    name='transaction_type'
                    placeholder='Spesa'
                    onChange={handleChange}
                    value={newSpendilowUserTransaction.transaction_type}
                  >
                    <option value='Income'>Entrata</option>
                    <option value='Expense'>Spesa</option>
                    <option value='Budget'>A Budget</option>
                  </select>
                </div>
                {newSpendilowUserTransaction.transaction_type === 'Budget' &&
                  availableBudgets.length > 0 && (
                    <div className='form-control desktop:w-5/12'>
                      <label className='label'>
                        <span className='label-text font-bold'>Budget</span>
                      </label>
                      <select
                        className='input input-bordered'
                        id='target_id'
                        name='target_id'
                        placeholder='I tuoi budget'
                        value={
                          newSpendilowUserTransaction.target_id != null
                            ? newSpendilowUserTransaction.target_id!
                            : ''
                        }
                        onChange={handleChange}
                      >
                        <option></option>
                        {availableBudgets.map((budget) => {
                          return (
                            <option key={nextId()} value={budget.id}>
                              {budget.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  )}
                {newSpendilowUserTransaction.transaction_type === 'Budget' &&
                  availableBudgets.length === 0 && (
                    <ErrorComponent
                      message={'Non hai budget da selezionare, creane uno nella sezione dedicata'}
                    ></ErrorComponent>
                  )}
                <div className='form-control desktop:w-5/12'>
                  <label className='label'>
                    <span className='label-text font-bold'>Note</span>
                  </label>
                  <textarea
                    className='textarea textarea-bordered'
                    id='notes'
                    name='notes'
                    placeholder='Extra spesa di Natale'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-control desktop:w-5/12'>
                  <label className='label'>
                    <span className='label-text font-bold'>Tag (Separati da virgole)</span>
                  </label>
                  <input
                    className='input input-bordered'
                    id='tags'
                    name='tags'
                    placeholder='Casa,Feste,Famiglia'
                    onChange={handleChange}
                  />
                </div>
                <div className='form-control desktop:w-full'>
                  {transactionInputError.state && (
                    <ErrorComponent message={transactionInputError.message}></ErrorComponent>
                  )}
                </div>
                <div className='form-control desktop:w-full'>
                  {isLoading ? (
                    <>
                      <button className='btn btn-accent font-primary'>
                        <span className='loading loading-dots loading-md'></span>
                      </button>
                    </>
                  ) : (
                    <>
                      <input
                        type='submit'
                        className='btn btn-accent font-primary'
                        value='Aggiungi'
                      ></input>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </form>
      )}
    </dialog>
  );
}
