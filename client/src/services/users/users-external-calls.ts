import axios from 'axios';
import { baseURL } from '..';
const route: string = '/users';
import { apiErrorResponseHandler } from '../general/apiErrorResponseHandler';
import { SpendilowUser, SpendilowUserLogin } from '../../shared/interfaces';

const signUpNewSpendilowUser = async function (newSpendilowUser: SpendilowUser): Promise<string> {
  let result: string = '';

  try {
    result = await axios
      .post(baseURL + route + '/new', newSpendilowUser, {
        withCredentials: true,
      })
      .then(() => {
        switch (newSpendilowUser.isMFAActive) {
          case true:
            return '/auth/mfa';
            break;
          case false:
            return '/auth/login';
            break;
          default:
            return '/auth/login';
            break;
        }
      })

      .catch((error) => {
        return apiErrorResponseHandler(error.response.status, error.response.data.errorMessage);
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      '#500 - I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const loginSpendilowUser = async function (userCredentials: SpendilowUserLogin): Promise<string> {
  let result: string = '';

  try {
    result = await axios
      .post(baseURL + route + '/login', userCredentials, {
        withCredentials: true,
      })
      .then((res) => {
        switch (res.data.toBeVerified) {
          case 1:
            return '/auth/mfa-verification';
            break;
          case 0:
            return '/user/dashboard';
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
      '#500 - I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const activateMFA = async function (): Promise<string> {
  let result: string = '';

  try {
    result = await axios
      .get(baseURL + route + '/mfa-activation')
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(error.response.status, error.response.data.errorMessage);
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      '#500 - I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const verifyMFA = async function (otp: string): Promise<string> {
  let result: string = '';

  try {
    result = await axios
      .post(baseURL + route + '/mfa-verification/', { otp })
      .then((res) => {
        switch (res.data.verified) {
          case true:
            return '/user/dashboard';
            break;
          default:
            return (window.location.href = '/');
            break;
        }
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          'Codice errato, riprova ad inserire la password temporanea o contatta il supporto!',
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      '#500 - I servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

export { signUpNewSpendilowUser, loginSpendilowUser, activateMFA, verifyMFA };
