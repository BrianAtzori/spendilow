// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "..";

// ------ DATA ------
const route: string = "/authenticated-users";

// ------ SERVICES ------
import { apiErrorResponseHandler } from "../general/apiErrorResponseHandler";

interface spendilowUserProfile {
  id: string;
  email: string;
  isMFAActive: boolean;
  savings: number;
  salary: number;
  profileImage: string;
  workfield: string;
  username: string;
}

const getSpendilowUserProfile = async (): Promise<spendilowUserProfile> => {
  let result: spendilowUserProfile = {
    id: "",
    email: "",
    isMFAActive: false,
    savings: 0,
    salary: 0,
    profileImage: "",
    workfield: "",
    username: "",
  };

  result = await axios
    .get(baseURL + route + "/get-profile", {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      apiErrorResponseHandler(
        error.response.status,
        "Non siamo riusciti a recuperare una sessione di accesso per caricare il tuo profilo, se possiedi un account effettua nuovamente il login altrimenti registra un nuovo profilo."
      );
    });

  console.log(result);
  return result;
};

export { getSpendilowUserProfile };
