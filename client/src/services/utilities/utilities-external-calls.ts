import axios from 'axios';
import { baseURL } from '..';

const route: string = '/utilities';

const checkServerAlive = async function (): Promise<boolean> {
  let isServerAlive: boolean = false;

  isServerAlive = await axios
    .get(baseURL + route + '/check-server-alive/')
    .then((res) => {
      if (res.data.available) {
        return true;
      }
      return false;
    })
    .catch(function () {
      return false;
    });

  return isServerAlive;
};

export { checkServerAlive };
