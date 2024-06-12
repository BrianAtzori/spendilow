import axios from 'axios';
import { baseURL } from '..';
const route: string = '/authenticated-users';
import { apiErrorResponseHandler } from '../general/apiErrorResponseHandler';
import { ExternalCallResult, SpendilowUser } from '../../shared/interfaces';

const verifyUserAccess = async (): Promise<boolean | string> => {
  let result: boolean | string;

  try {
    result = await axios
      .get(baseURL + route + '/verify', {
        withCredentials: true,
      })
      .then((res) => {
        return res.data.success;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          'Non siamo riusciti a recuperare una sessione di accesso per caricare il tuo profilo, se possiedi un account effettua nuovamente il login altrimenti registra un nuovo profilo.',
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      'Non siamo riusciti a recuperare una sessione di accesso per caricare il tuo profilo, i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const getSpendilowUserProfile = async (): Promise<ExternalCallResult | string> => {
  let result: ExternalCallResult | string;

  try {
    result = await axios
      .get(baseURL + route + '/get-profile', {
        withCredentials: true,
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return apiErrorResponseHandler(
          error.response.status,
          'Non siamo riusciti a recuperare una sessione di accesso per caricare il tuo profilo, se possiedi un account effettua nuovamente il login altrimenti registra un nuovo profilo.',
        );
      });
  } catch (error) {
    result = apiErrorResponseHandler(
      500,
      'Non siamo riusciti a recuperare una sessione di accesso per caricare il tuo profilo,i servizi di Spendilow non sembrano raggiungibili. Riprova o contatta il supporto.',
    );
  }

  return result;
};

const editSpendilowUserProfile = async (editedSpendilowUser: SpendilowUser) => {
  let result: string = '';

  try {
    result = await axios
      .patch(baseURL + route + '/mod/', editedSpendilowUser, {
        withCredentials: true,
      })
      .then(() => {
        return '/user/dashboard';
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

const logoutSpendilowUserProfile = async (target: string) => {
  let result: string = '';

  try {
    result = await axios
      .get(baseURL + route + '/logout/', { withCredentials: true })
      .then((res) => {
        if (res.data['logged-out']) {
          switch (target) {
            case 'change':
              return '/auth/login';
              break;
            case 'logout':
              return '/';
              break;
            default:
              return '/auth/sign-up';
              break;
          }
        } else {
          return '/auth/sign-up';
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

const deleteSpendilowUserProfile = async () => {
  let result: string = '';

  try {
    result = await axios
      .delete(baseURL + route + '/del/', {
        withCredentials: true,
      })
      .then(() => {
        return '/';
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

export {
  getSpendilowUserProfile,
  editSpendilowUserProfile,
  logoutSpendilowUserProfile,
  deleteSpendilowUserProfile,
  verifyUserAccess,
};
