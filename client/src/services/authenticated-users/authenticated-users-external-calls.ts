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
  profileimage: string;
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
    profileimage: "",
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

  return result;
};

const editSpendilowUserProfile = async (
  editedSpendilowUser: spendilowUserProfile
) => {
  let result: string = "";

  result = await axios
    .patch(baseURL + route + "/mod/", editedSpendilowUser, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return apiErrorResponseHandler(
        error.response.status,
        error.response.data.errorMessage
      );
    });

  return result;
};

const logoutSpendilowUserProfile = async (target: string) => {
  let result: string = "";

  result = await axios
    .get(baseURL + route + "/logout/", { withCredentials: true })
    .then((res) => {
      if (res.data["logged-out"]) {
        switch (target) {
          case "change":
            return "/auth/login";
            break;
          case "logout":
            return "/";
            break;
          default:
            return "/auth/sign-up";
            break;
        }
      } else {
        return "/auth/sign-up";
      }
    })
    .catch((error) => {
      return apiErrorResponseHandler(
        error.response.status,
        error.response.data.errorMessage
      );
    });

  return result;
};

const deleteSpendilowUserProfile = async () => {
  let result: string = "";

  result = await axios
    .delete(baseURL + route + "/del/", {
      withCredentials: true,
    })
    .then(() => {
      return "/";
    })
    .catch((error) => {
      return apiErrorResponseHandler(
        error.response.status,
        error.response.data.errorMessage
      );
    });

  return result;
};

export {
  getSpendilowUserProfile,
  editSpendilowUserProfile,
  logoutSpendilowUserProfile,
  deleteSpendilowUserProfile,
};
