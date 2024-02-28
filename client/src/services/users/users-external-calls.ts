// ------ PACKAGES ------
import axios from "axios";

// ------ ASSETS ------
import { baseURL } from "..";

// ------ DATA ------
const route: string = "/users";

// ------ SERVICES ------
import { apiErrorResponseHandler } from "../general/apiErrorResponseHandler";

// ------ TYPESCRIPT ------
interface newSpendilowUser {
  email: string;
  password: string;
  savings: number;
  salary: number;
  profileimage: string;
  workfield: string;
  username: string;
  isMFAActive: boolean;
}

interface spendilowUserLogin {
  email: string;
  password: string;
}

// ------ CALLS ------
const signUpNewSpendilowUser = async function (
  newSpendilowUser: newSpendilowUser
): Promise<string> {
  let result: string = "";

  try {
    result = await axios
      .post(baseURL + route + "/new", newSpendilowUser, {
        withCredentials: true,
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((res) => {
        switch (newSpendilowUser.isMFAActive) {
          case true:
            return "/auth/mfa";
            break;
          case false:
            return "/auth/login";
            break;
          default:
            return "/auth/login";
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
      "#500 - I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const loginSpendilowUser = async function (
  userCredentials: spendilowUserLogin
): Promise<string> {
  let result: string = "";

  try {
    result = await axios
      .post(baseURL + route + "/login", userCredentials, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        switch (res.data.toBeVerified) {
          case 1:
            return "/auth/mfa-verification";
            break;
          case 0:
            return "/user/dashboard";
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
      "#500 - I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const activateMFA = async function (): Promise<string> {
  let result: string = "";

  try {
    result = await axios
      .get(baseURL + route + "/mfa-activation")
      .then((res) => {
        return res.data;
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
      "#500 - I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

const verifyMFA = async function (otp: string): Promise<string> {
  let result: string = "";

  try {
    result = await axios
      .post(baseURL + route + "/mfa-verification/", { otp })
      .then((res) => {
        switch (res.data.verified) {
          case true:
            return "/user/dashboard";
            break;
          default:
            return (window.location.href = "/");
            break;
        }
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          "Codice errato, riprova ad inserire la password temporanea o contatta il supporto!"
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      "#500 - I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto."
    );
  }

  return result;
};

export { signUpNewSpendilowUser, loginSpendilowUser, activateMFA, verifyMFA };
