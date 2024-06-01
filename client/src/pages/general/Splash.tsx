// ------ REACT ------
import React, { useEffect } from 'react';
import { useState } from 'react';

// ------ COMPONENTS & PAGES ------
import LoaderComponent from '../../components/shared/LoaderComponent';
import ErrorScreenComponent from '../../components/shared/ErrorScreenComponent';
import Landing from '../auth/Landing';

// ------ SERVICES ------
import { checkServerAlive } from '../../services/utilities/utilities-external-calls';

//* This component manage user redirection, if server is alive check if user is logged, if it's logged go to app or go to auth picker

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
