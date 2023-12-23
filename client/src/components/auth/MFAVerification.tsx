// ------ REACT ------
import React, { useState, SyntheticEvent } from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";

// ------ COMPONENTS & PAGES ------
import ErrorComponent from "../shared/ErrorComponent";

// ------ SERVICES ------
import { verifyMFA } from "../../services/users/users-external-calls";

export default function MFAVerification() {
  // ------ HOOKS ------
  const [userChallenge, setUserChallenge] = useState("");

  const [mfaError, setMfaError] = useState({
    state: false,
    message: "Errore in fase di verifica del codice numerico.",
  });

  const [isLoading, setIsLoading] = useState(false);

  // ------ FORM HANDLING ------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserChallenge(event.target.value);
  };

  async function verifyInputThenTriggerMFAVerification(event: SyntheticEvent) {
    event.preventDefault();
    setMfaError({
      state: false,
      message: "",
    });

    if (userChallenge === null) {
      setMfaError({
        state: true,
        message: "Verifica i dati inseriti, alcuni campi sono vuoti!",
      });
    } else {
      setIsLoading(true);
      await MFAChallengeVerification();
    }
  }

  // ------ FUNCTIONS ------
  async function MFAChallengeVerification() {
    await verifyMFA(userChallenge);
  }

  return (
    <div className="hero min-h-screen text-neutral p-10">
      <div className="hero-content flex-col desktop:flex-row-reverse">
        <div className="text-center desktop:text-left">
          <h1 className="text-5xl font-bold font-primary text-neutral">
            Verifica la tua identità
          </h1>
          <ul className="font-heading py-6">
            <li>
              1. Scarica l'applicazione "Google Authenticator" per mettere in
              sicurezza il tuo account.
            </li>
            <li>
              2. Apri l'applicazione e aggiungi un nuovo codice premendo il
              tasto in basso a destra con il simbolo "+".
            </li>
            <li>3. Selezione l'opzione "Scansiona un codice QR".</li>
            <li>
              4. Nella tua applicazione verrà aggiunta un timer che genererà i
              tuoi codici di sicurezza da inserire in fase di Login."
            </li>
          </ul>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            className="card-body font-body"
            onSubmit={verifyInputThenTriggerMFAVerification}
          >
            <img src={spendilowLogo} />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Il tuo codice</span>
              </label>
              <input
                id="email"
                name="email"
                type="number"
                placeholder="123456"
                className="input input-bordered"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              {mfaError.state && (
                <ErrorComponent message={mfaError.message}></ErrorComponent>
              )}
            </div>
            <div className="form-control mt-6">
              <div className="form-control">
                {isLoading ? (
                  <>
                    <button className="btn btn-accent font-primary bg-accent">
                      <span className="loading loading-dots loading-md"></span>
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="submit"
                      className="btn btn-accent font-primary bg-accent"
                      value="Verifica"
                    ></input>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
