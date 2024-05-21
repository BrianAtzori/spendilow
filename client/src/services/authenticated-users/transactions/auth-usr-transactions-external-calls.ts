// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "../../";

// ------ DATA ------
const route: string = "/authenticated-users/transactions";

// ------ SERVICES ------
import { apiErrorResponseHandler } from "../../general/apiErrorResponseHandler";

// ------ TYPESCRIPT ------
interface spendilowTransactions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transaction_date: string;
  amount: number;
  title: string;
  notes: string;
  tags: string;
  transaction_type: string;
  target_id: string | null;
}

const getSpendilowUserTransactions = async (): Promise<
  spendilowTransactions[] | string[]
> => {
  let result: spendilowTransactions[] | string[] = [
    {
      transaction_date: new Date(),
      amount: 0,
      title: "",
      notes: "",
      tags: "",
      transaction_type: "",
      target_id: "",
    },
  ];

  try {
    result = await axios
      .get(baseURL + route + "/get/all", {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          "Non siamo riusciti a recuperare le tue transazioni, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto."
        );
      });
  } catch (error) {
    result[0] = apiErrorResponseHandler(
      500,
      "Non siamo riusciti a recuperare le tue transazioni, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const createNewSpendilowUserTransaction = async (
  newSpendilowTransaction: spendilowTransactions
): Promise<string> => {
  let result: string = "";

  console.log(newSpendilowTransaction.transaction_date);

  // newSpendilowTransaction.transaction_date.getUTCFullYear().toString() +
  //   "/" +
  //   (newSpendilowTransaction.transaction_date.getUTCMonth() + 1).toString() +
  //   "/" +
  //   (newSpendilowTransaction.transaction_date.getUTCDate() + 1).toString();

  try {
    result = await axios
      .post(baseURL + route + "/new", newSpendilowTransaction, {
        withCredentials: true,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        switch (res.data.success) {
          case true:
            return res.data.message;
            break;
          case false:
            return apiErrorResponseHandler(
              400,
              "Qualcosa é andato storto nella creazione della transazione, ricontrolla i dati e riprova oppure contatta il supporto con questo messaggio:" +
                res.data.message
            );
            break;
          default:
            return "/user/dashboard";
            break;
        }
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          error.response.data.errorMessage
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      "#500 - Qualcosa é andato storto nella creazione della  I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const getSpendilowUserTransaction = async (
  transactionID: string
): Promise<spendilowTransactions | string> => {
  let result: spendilowTransactions | string = {
    transaction_date: new Date(),
    amount: 0,
    title: "",
    notes: "",
    tags: "",
    transaction_type: "",
    target_id: "",
  };
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
          "Non siamo riusciti a recuperare la tua transazione, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto."
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      "Non siamo riusciti a recuperare la tua transazione, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const deleteSpendilowUserTransaction = async (
  transactionID: string
): Promise<string> => {
  let result: string = "";

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
          "Non siamo riusciti ad eliminare la tua transazione, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto."
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      "Non siamo riusciti a recuperare la tua transazione, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const editSpendilowUserTransaction = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editedTransaction: any
): Promise<string> => {
  let result: string = "";

  const { amount, title, notes, tags, target_id, transaction_type } =
    editedTransaction;

  editedTransaction.transaction_date =
    editedTransaction.transaction_date.getUTCFullYear().toString() +
    "/" +
    (editedTransaction.transaction_date.getUTCMonth() + 1).toString() +
    "/" +
    (editedTransaction.transaction_date.getUTCDate() + 1).toString();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transactionEditingBody: any = {
    amount,
    title,
    notes,
    tags,
    target_id,
    transaction_type,
  };

  transactionEditingBody.transaction_date = editedTransaction.transaction_date;

  try {
    result = await axios
      .patch(
        baseURL + route + `/mod/${editedTransaction.id}`,
        transactionEditingBody,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          "Non siamo riusciti a modificare la tua transazione, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto."
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      "Non siamo riusciti a modificare la tua transazione, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
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
