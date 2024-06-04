import { useEffect } from 'react';
import { useState } from 'react';
import LoaderComponent from '../../components/shared/LoaderComponent';
import ErrorScreenComponent from '../../components/shared/ErrorScreenComponent';
import Landing from '../auth/Landing';
import { checkServerAlive } from '../../services/utilities/utilities-external-calls';

export default function Splash() {
  const [isLoading, setIsLoading] = useState(true);
  const [isServerAlive, setServerAlive] = useState(false);

  useEffect(() => {
    preFlightChecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function preFlightChecks() {
    setServerAlive(await checkServerAlive());

    isServerAlive ? setIsLoading(false) : setIsLoading(false);
  }

  return (
    <>
      <LoaderComponent
        isLoading={isLoading}
        message={'Controllo il collegamento ai server di Spendilow 💰'}
      ></LoaderComponent>
      {isServerAlive && <Landing></Landing>}
      {!isServerAlive && (
        <ErrorScreenComponent message='I servizi di Spendilow non risultano raggiungibili, contatta il supporto 📲'></ErrorScreenComponent>
      )}
    </>
  );
}
