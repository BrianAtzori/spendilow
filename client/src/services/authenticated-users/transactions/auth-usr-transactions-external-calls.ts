import axios, { AxiosResponse } from 'axios';
import { baseURL } from '../../';
const route: string = '/authenticated-users/transactions';
import { apiErrorResponseHandler } from '../../general/apiErrorResponseHandler';
import { ExternalCallResult, SpendilowTransaction } from '../../../shared/interfaces';

const getSpendilowUserTransactions = async (): Promise<ExternalCallResult | string> => {
  let result: ExternalCallResult | string;

  try {
    result = await axios
      .get(baseURL + route + '/get/all', {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          'Non siamo riusciti a recuperare le tue transazioni, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto.',
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      'Non siamo riusciti a recuperare le tue transazioni, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const createNewSpendilowUserTransaction = async (
  newSpendilowTransaction: SpendilowTransaction,
): Promise<string> => {
  let result: string = '';

  try {
    result = await axios
      .post(baseURL + route + '/new', newSpendilowTransaction, {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        switch (res.data.success) {
          case true:
            return res.data.message;
            break;
          case false:
            return apiErrorResponseHandler(
              400,
              'Qualcosa é andato storto nella creazione della transazione, ricontrolla i dati e riprova oppure contatta il supporto con questo messaggio:' +
                res.data.message,
            );
            break;
          default:
            return '/user/dashboard';
            break;
        }
      })
      .catch((error) => {
        return apiErrorResponseHandler(error.response.status, error.response.data.errorMessage);
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      '#500 - Qualcosa é andato storto nella creazione della  I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const getSpendilowUserTransaction = async (
  transactionID: string,
): Promise<ExternalCallResult | string> => {
  let result: ExternalCallResult | string;

  try {
    result = await axios
      .get(baseURL + route + `/get/${transactionID}`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          'Non siamo riusciti a recuperare la tua transazione, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto.',
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      'Non siamo riusciti a recuperare la tua transazione, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const deleteSpendilowUserTransaction = async (transactionID: string): Promise<string> => {
  let result: string = '';

  try {
    result = await axios
      .delete(baseURL + route + `/del/${transactionID}`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          'Non siamo riusciti ad eliminare la tua transazione, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto.',
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      'Non siamo riusciti a recuperare la tua transazione, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const editSpendilowUserTransaction = async (
  editedTransaction: SpendilowTransaction,
): Promise<string> => {
  let result: string = '';

  const { amount, title, notes, tags, target_id, transaction_type } = editedTransaction;

  editedTransaction.transaction_date =
    (editedTransaction.transaction_date as Date).getUTCFullYear().toString() +
    '/' +
    ((editedTransaction.transaction_date as Date).getUTCMonth() + 1).toString() +
    '/' +
    (editedTransaction.transaction_date as Date).getUTCDate().toString();

  const transactionEditingBody: SpendilowTransaction = {
    amount,
    title,
    notes,
    tags,
    target_id,
    transaction_type,
    transaction_date: ' ',
  };

  transactionEditingBody.transaction_date = editedTransaction.transaction_date;

  try {
    result = await axios
      .patch(baseURL + route + `/mod/${editedTransaction.id}`, editedTransaction, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          'Non siamo riusciti a modificare la tua transazione, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto.',
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      'Non siamo riusciti a modificare la tua transazione, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

export {
  getSpendilowUserTransactions,
  createNewSpendilowUserTransaction,
  getSpendilowUserTransaction,
  deleteSpendilowUserTransaction,
  editSpendilowUserTransaction,
};
