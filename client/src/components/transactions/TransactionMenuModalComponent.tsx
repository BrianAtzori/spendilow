import { useRef, useEffect, SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorScreenComponent from '../shared/ErrorScreenComponent';
import LoaderComponent from '../shared/LoaderComponent';
import TransactionDataComponent from './transaction-menu-modal-components/TransactionDataComponent';
import TransactionDataFunctionsComponent from './transaction-menu-modal-components/TransactionDataFunctionsComponent';
import { useAppSelector } from '../../redux/hooks';
import { getSpendilowUserTransaction } from '../../services/authenticated-users/transactions/auth-usr-transactions-external-calls';
import { editSpendilowUserTransaction } from '../../services/authenticated-users/transactions/auth-usr-transactions-external-calls';
import { ExternalCallResult, SpendilowTransaction } from '../../shared/interfaces';
import { changeUserLoggedState } from '../../redux/reducers/auth/userLoggedSlice';
import { useDispatch } from 'react-redux';

interface TransactionMenuModalProps {
  visible: boolean;
  // eslint-disable-next-line no-unused-vars
  onClose: (value: React.SetStateAction<boolean>) => void;
}

export default function TransactionMenuModalComponent({
  visible,
  onClose,
}: TransactionMenuModalProps) {
  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
    getTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const currentTransactionID: string = useAppSelector(
    (state) => state.transactionMenuModal.transactionID,
  );

  const [spendilowUserTransaction, setNewSpendilowUserTransaction] = useState<SpendilowTransaction>(
    {
      id: '',
      transaction_date: new Date(),
      amount: 0,
      title: '',
      notes: '',
      tags: '',
      transaction_type: 'Expense',
      target_id: '',
    },
  );

  const modalRef = useRef<HTMLDialogElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [transactionMenuError, setTransactionMenuError] = useState({
    state: false,
    message: 'Errore in fase di aggiunta della transazione.',
  });

  const dispatch = useDispatch();

  const [isEditingLoading, setIsEditingLoading] = useState(false);

  const [transactionMenuEditingError, setTransactionMenuEditingError] = useState({
    state: false,
    message: 'Errore in fase di modifica della transazione.',
  });

  const handleClose = () => {
    if (onClose) {
      onClose(false); //Update Show Dialog State
    }
  };

  const handleESC = (event: SyntheticEvent) => {
    event.preventDefault();
    handleClose();
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (event.target.name === 'transaction_date') {
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
      message: '',
    });

    if (
      spendilowUserTransaction.transaction_date === undefined ||
      spendilowUserTransaction.amount === undefined ||
      spendilowUserTransaction.title === '' ||
      spendilowUserTransaction.transaction_type === '' ||
      spendilowUserTransaction.transaction_date === null
    ) {
      setTransactionMenuEditingError({
        state: true,
        message: 'Verifica i dati inseriti, alcuni campi sono vuoti!',
      });
    } else {
      await editTransaction();
    }
  }

  async function getTransaction() {
    const externalCallResult: ExternalCallResult | string = await getSpendilowUserTransaction(
      currentTransactionID,
    ).finally(() => {
      setIsLoading(false);
    });

    if ((externalCallResult as ExternalCallResult).transaction) {
      setNewSpendilowUserTransaction((externalCallResult as ExternalCallResult).transaction!);
      dispatch(changeUserLoggedState(true));
      //TODO: Manage success
    } else {
      setTransactionMenuError({
        state: true,
        message: externalCallResult as string,
      });
    }
  }

  async function editTransaction() {
    const response = confirm('Vuoi modificare la transazione?');
    setIsLoading(true);

    const { id, amount, title, notes, tags, target_id, transaction_date, transaction_type } =
      spendilowUserTransaction;

    if (response) {
      const externalCallResult: ExternalCallResult | string = await editSpendilowUserTransaction({
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

      if ((externalCallResult as ExternalCallResult).success) {
        // window.location.href = import.meta.env.VITE_BASENAME + '/user/dashboard';
        dispatch(changeUserLoggedState(true));
        //TODO: Manage success
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
    <dialog ref={modalRef} id='menu_transaction_modal' className='modal' onCancel={handleESC}>
      <button
        className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-base-100'
        onClick={handleClose}
      >
        ✕
      </button>
      <form method='dialog' className='modal-box' onSubmit={verifyInputThenTriggerEditing}>
        <LoaderComponent
          isLoading={isLoading}
          message={'Modifica della transazione in corso 💰'}
        ></LoaderComponent>
        {transactionMenuError.state ? (
          <>
            <ErrorScreenComponent message={transactionMenuError['message']}></ErrorScreenComponent>
            <Link to='/'>
              <button className='btn btn-accent font-primary bg-accent place-self-end fixed bottom-3 right-3 shadow'>
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
