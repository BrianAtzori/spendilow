// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "../../";

// ------ DATA ------
const route: string = "/authenticated-users/budgets";

// ------ SERVICES ------
import { apiErrorResponseHandler } from "../../general/apiErrorResponseHandler";

interface SpendilowBudget {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id?: number;
  name: string;
  description: string;
}

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

export { createNewSpendilowUserBudget };
