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
  transaction_date: any;
  amount: number;
  title: string;
  notes: string;
  tags: string;
  transaction_type: string;
  target_id: string;
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
  //TODO: Filtro ultimi 30 giorni? Con una mod?
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

  newSpendilowTransaction.transaction_date =
    newSpendilowTransaction.transaction_date.getUTCFullYear().toString() +
    "/" +
    (newSpendilowTransaction.transaction_date.getUTCMonth() + 1).toString() +
    "/" +
    newSpendilowTransaction.transaction_date.getUTCDate().toString();

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

export { getSpendilowUserTransactions, createNewSpendilowUserTransaction };
