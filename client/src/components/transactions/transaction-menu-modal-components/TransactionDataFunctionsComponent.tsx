import { useEffect, useState } from 'react';
import ErrorComponent from '../../shared/ErrorComponent';
import { deleteSpendilowUserTransaction } from '../../../services/authenticated-users/transactions/auth-usr-transactions-external-calls';
import { getSpendilowUserBudgets } from '../../../services/authenticated-users/budgets/auth-usr-budgets-external-calls';
import { updateUserBudgets } from '../../../redux/reducers/budgets/userBudgetSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/hooks';
import LoaderComponent from '../../shared/LoaderComponent';
import nextId from 'react-id-generator';
import {
  ExternalCallResult,
  SpendilowError,
  SpendilowTransaction,
} from '../../../shared/interfaces';

interface TransactionDataFunctionsProps {
  transaction: SpendilowTransaction;
  isEditingLoading: boolean;
  handleChange: (
    // eslint-disable-next-line no-unused-vars
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  transactionMenuEditingError: SpendilowError;
}

export default function TransactionDataFunctionsComponent({
  transaction,
  handleChange,
  isEditingLoading,
  transactionMenuEditingError,
}: TransactionDataFunctionsProps) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    getAvailableBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormVisible]);

  const [areAvailableBudgetsLoading, setAreAvailableBudgetsLoading] = useState(true);
  const [budgetsError, setBudgetsError] = useState({
    state: false,
    message: 'Errore durante il caricamento dei tuoi budget.',
  });

  const [isDeletionLoading, setIsLoading] = useState(false);
  const [transactionMenuDeletionError, setTransactionMenuDeletionError] = useState({
    state: false,
    message: 'Errore in fase di eliminazione della transazione.',
  });

  const availableBudgets = useAppSelector((state) => state.userBudget.budgets);

  const dispatch = useDispatch();

  async function getAvailableBudgets() {
    const externalCallResult: ExternalCallResult | string = await getSpendilowUserBudgets().finally(
      () => {
        setAreAvailableBudgetsLoading(false);
      },
    );
    if ((externalCallResult as ExternalCallResult).budgets) {
      dispatch(updateUserBudgets((externalCallResult as ExternalCallResult).budgets));
    } else {
      setBudgetsError({
        state: true,
        message: externalCallResult as string,
      });
    }
  }

  async function deleteTransaction() {
    const response = confirm('Vuoi eliminare questa transazione?');
    setIsLoading(true);

    if (response) {
      const externalCallResult: ExternalCallResult | string = await deleteSpendilowUserTransaction(
        transaction.id!,
      ).finally(() => {
        setIsLoading(false);
      });

      if ((externalCallResult as ExternalCallResult).success) {
        window.location.href = import.meta.env.VITE_BASENAME + '/user/dashboard';
      } else {
        setTransactionMenuDeletionError({
          state: true,
          message: externalCallResult,
        });
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        {isFormVisible &&
          (areAvailableBudgetsLoading ? (
            <LoaderComponent
              isLoading={areAvailableBudgetsLoading}
              message={'Caricamento Budget disponibili'}
            ></LoaderComponent>
          ) : budgetsError.state ? (
            <ErrorComponent message={budgetsError.message}></ErrorComponent>
          ) : (
            <div className='form-control desktop:w-full'>
              <div className='flex flex-col gap-4 font-heading desktop:flex-row desktop:flex-wrap desktop:justify-between'>
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
                    value={transaction.amount}
                  />
                </div>
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
                    value={transaction.title}
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
                    value={transaction.transaction_type}
                  >
                    <option value='Income'>Entrata</option>
                    <option value='Expense'>Spesa</option>
                    <option value='Budget'>A Budget</option>
                  </select>
                </div>
                {transaction.transaction_type === 'Budget' && availableBudgets.length > 0 && (
                  <div className='form-control desktop:w-5/12'>
                    <label className='label'>
                      <span className='label-text font-bold'>Budget</span>
                    </label>
                    <select
                      className='input input-bordered'
                      id='target_id'
                      name='target_id'
                      placeholder='I tuoi budget'
                      value={transaction.target_id != null ? transaction.target_id! : ''}
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
                {transaction.transaction_type === 'Budget' && availableBudgets.length === 0 && (
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
                    value={transaction.notes}
                  />
                </div>
                <div className='form-control desktop:w-5/12'>
                  <label className='label'>
                    <span className='label-text font-bold'>Tag</span>
                  </label>
                  <input
                    className='input input-bordered'
                    id='tags'
                    name='tags'
                    placeholder='Casa,Feste,Famiglia'
                    onChange={handleChange}
                    value={transaction.tags}
                  />
                </div>
                <div className='form-control desktop:w-full'>
                  {transactionMenuEditingError.state && (
                    <ErrorComponent message={transactionMenuEditingError.message!}></ErrorComponent>
                  )}
                </div>
                <div className='form-control desktop:w-full'>
                  {isEditingLoading ? (
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
                        value='Conferma modifiche'
                      ></input>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

        {!isFormVisible && (
          <button
            className='btn btn-accent font-primary'
            onClick={() => setIsFormVisible(!isFormVisible)}
          >
            Modifica la transazione
          </button>
        )}

        <div className='form-control'>
          {transactionMenuDeletionError.state && (
            <ErrorComponent message={transactionMenuDeletionError.message}></ErrorComponent>
          )}
        </div>
        <div className='form-control desktop:w-full'>
          {isDeletionLoading ? (
            <>
              <button className='btn btn-accent font-primary'>
                <span className='loading loading-dots loading-md'></span>
              </button>
            </>
          ) : (
            <>
              <button className='btn btn-accent font-primary' onClick={deleteTransaction}>
                Elimina questa transazione
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
