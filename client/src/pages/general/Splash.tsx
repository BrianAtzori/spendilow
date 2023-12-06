// ------ REACT ------
import React, { useEffect } from "react";
import { useState } from "react";

// ------ COMPONENTS & PAGES ------
import Loader from "../../components/shared/Loader";

// ------ SERVICES ------
import { checkServerAlive } from "../../services/utilities/external-calls";

//* This component manage user redirection, if server is alive check if user is logged, if it's logged go to app or go to auth picker

export default function Splash() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    preFlightChecks();
  }, []);

  async function preFlightChecks() {
    setIsLoading(await checkServerAlive());

    //**! Gestisci true/false */
  }

  return (
    <>
      <Loader
        isLoading={isLoading}
        message={"Controllo il collegamento ai server di Spendilow 💰"}
      ></Loader>
    </>
  );
}
