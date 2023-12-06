// ------ REACT ------
import React, { useEffect } from "react";
import { useState } from "react";

// ------ COMPONENTS & PAGES ------
import Loader from "../../components/shared/Loader";
import ErrorComponent from "../../components/shared/ErrorComponent";

// ------ SERVICES ------
import { checkServerAlive } from "../../services/utilities/external-calls";

//* This component manage user redirection, if server is alive check if user is logged, if it's logged go to app or go to auth picker

export default function Splash() {
  const [isLoading, setIsLoading] = useState(true);
  const [isServerAlive, setServerAlive] = useState(false)

  useEffect(() => {
    preFlightChecks();
  }, []);

  async function preFlightChecks() {

    setServerAlive (await checkServerAlive())

    isServerAlive ? setIsLoading(false) : setIsLoading(false);

  }

  return (
    <>
      <Loader
        isLoading={isLoading}
        message={"Controllo il collegamento ai server di Spendilow 💰"}
      ></Loader> 
      {!isServerAlive || <h1>Ciao</h1>}
      {isServerAlive || <ErrorComponent message="I servizi di Spendilow risultano non raggiungibili, contatta il supporto 📲"></ErrorComponent>}
    </>
  );
}
