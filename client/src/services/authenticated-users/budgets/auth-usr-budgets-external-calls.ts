// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "../../";

// ------ DATA ------
const route: string = "/authenticated-users/budgets";

// ------ SERVICES ------
import { apiErrorResponseHandler } from "../../general/apiErrorResponseHandler";

// ------ TYPESCRIPT ------
import {
  ExternalCallResult,
  SpendilowBudget,
} from "../../../shared/interfaces";

const createNewSpendilowUserBudget = async (
  newSpendilowBudget: SpendilowBudget
): Promise<string> => {
  let result: string = "";

  try {
    result = await axios
      .post(baseURL + route + "/new", newSpendilowBudget, {
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

const getSpendilowUserBudgets = async (): Promise<
  ExternalCallResult | string
> => {
  let result: ExternalCallResult | string;

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
    result = apiErrorResponseHandler(
      500,
      "Non siamo riusciti a recuperare le tue transazioni, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const getSpendilowUserBudget = async (
  budgetId: string
): Promise<SpendilowBudget | string> => {
  let result: SpendilowBudget | string = {
    id: "",
    name: "",
    description: "",
  };
  try {
    result = await axios
      .get(baseURL + route + `/get/${budgetId}`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          "Non siamo riusciti a recuperare il tuo budget, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto."
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      "Non siamo riusciti a recuperare il tuo budget, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const editSpendilowUserBudget = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editedBudget: any
): Promise<string> => {
  let result: string = "";

  try {
    result = await axios
      .patch(baseURL + route + `/mod/${editedBudget.id}`, editedBudget, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          "Non siamo riusciti a modificare il tuo budget, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto."
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      "Non siamo riusciti a modificare il tuo budget, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const deleteSpendilowUserBudget = async (
  budgetId?: string
): Promise<string> => {
  let result: string = "";

  try {
    result = await axios
      .delete(baseURL + route + `/del/${budgetId}`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          "Non siamo riusciti ad eliminare questo budget, se possiedi un account prova ad effettuare nuovamente il login altrimenti contatta il supporto."
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      "Non siamo riusciti ad eliminare questo budget, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

export {
  deleteSpendilowUserBudget,
  createNewSpendilowUserBudget,
  getSpendilowUserBudgets,
  getSpendilowUserBudget,
  editSpendilowUserBudget,
};
