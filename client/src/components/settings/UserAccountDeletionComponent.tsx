// ------ REACT ------
import React, { useState } from "react";

// ------- PAGES & COMPONENTS ------
import ErrorComponent from "../../components/shared/ErrorComponent";

// ------ REDUX ------
import { useAppDispatch } from "../../redux/hooks";
import { changeUserLoggedState } from "../../redux/reducers/auth/userLoggedSlice";

// ------ SERVICES ------
import { deleteSpendilowUserProfile } from "../../services/authenticated-users/authenticated-users-external-calls";

export default function UserAccountDeletionComponent() {
  // ------ HOOKS ------
  const [isLoading, setIsLoading] = useState(false);

  const [profileError, setProfileError] = useState({
    state: false,
    message: "Errore durante l'uscita dal profilo",
  });

  const dispatch = useAppDispatch();

  // ------ FUNCTIONS ------
  async function deleteProfile() {
    const response = confirm("Vuoi eliminare il tuo profilo?");
    setIsLoading(true);

    if (response) {
      const externalCallResult: string =
        await deleteSpendilowUserProfile().finally(() => {
          setIsLoading(false);
        });

      if (externalCallResult.startsWith("/")) {
        dispatch(changeUserLoggedState(false));
        window.location.href =
          import.meta.env.VITE_BASENAME + externalCallResult;
      } else {
        setProfileError({ state: true, message: externalCallResult });
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className="text-neutral py-6">
      <div className="hero-content flex-col desktop:flex-row-reverse">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body font-body">
            {isLoading ? (
              <>
                <button className="btn btn-accent font-primary">
                  <span className="loading loading-dots loading-md"></span>
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-error font-primary bg-error"
                  onClick={deleteProfile}
                >
                  Elimina il tuo profilo
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
  );
}
