// ------ REACT ------
import React, { useState } from "react";

// ------ COMPONENTS & PAGES ------
import ErrorComponent from "../shared/ErrorComponent";

// ------ SERVICES ------
import { logoutSpendilowUserProfile } from "../../services/authenticated-users/authenticated-users-external-calls";

export default function ChangeOrLogoutComponent() {
  // ------ HOOKS ------
  const [isLoading, setIsLoading] = useState(false);

  const [profileError, setProfileError] = useState({
    state: false,
    message: "Errore durante l'uscita dal profilo",
  });

  // ------ FUNCTIONS ------
  async function deleteCookiesAndLogout(operation: string) {
    const response = confirm("Vuoi uscire dal tuo profilo?");
    setIsLoading(true);

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalCallResult: any = await logoutSpendilowUserProfile(
        operation
      ).finally(() => {
        setIsLoading(false);
      });

      //TODO: userlogged a false

      externalCallResult.startsWith("/")
        ? (window.location.href = externalCallResult)
        : setProfileError({ state: true, message: externalCallResult });
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className="text-neutral py-6">
      <div className="hero-content flex-col desktop:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body font-body">
            <div className="form-control">
              {isLoading ? (
                <>
                  <button className="btn btn-accent font-primary">
                    <span className="loading loading-dots loading-md"></span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-accent font-primary bg-accent"
                    onClick={() => deleteCookiesAndLogout("change")}
                  >
                    🔄 Cambia profilo
                  </button>
                </>
              )}
            </div>
            <div className="form-control">
              {isLoading ? (
                <>
                  <button className="btn btn-accent font-primary">
                    <span className="loading loading-dots loading-md"></span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-accent font-primary bg-accent"
                    onClick={() => deleteCookiesAndLogout("logout")}
                  >
                    🚪 Logout
                  </button>
                </>
              )}
            </div>
            <div className="form-control">
              {profileError.state && (
                <ErrorComponent message={profileError.message}></ErrorComponent>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
