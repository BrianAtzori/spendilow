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
  transaction_date: Date;
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

export { getSpendilowUserTransactions };
