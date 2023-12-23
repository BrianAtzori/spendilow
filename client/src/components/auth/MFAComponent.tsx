// ------ REACT ------
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";

// ------ SERVICES ------
import { activateMFA } from "../../services/users/users-external-calls";

export default function MFAComponent() {
  useEffect(() => {
    generateQR();
  }, []);

  const [QRCode, setQRCode] = useState();

  async function generateQR() {
    const generatedQR = await activateMFA();
    setQRCode(generatedQR);
  }

  return (
    <div className="hero min-h-screen text-neutral py-10">
      <div className="hero-content flex-col desktop:flex-row-reverse">
        <div className="text-center desktop:text-left">
          <h1 className="text-5xl font-bold font-primary text-neutral">
            Attiva l'autenticazione a due fattori
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
          <form className="card-body font-body">
            <img src={spendilowLogo} />
            <div role="alert" className="alert alert-warning form-control">
              <span>
                Una volta iniziata la procedura è necessario completare
                l'attivazione su Google Authenticator altrimenti il tuo account
                rimarrà bloccato.
              </span>
            </div>
            <div className="form-control">
              <div className="mockup-phone border-primary mx-0 my-2">
                <div className="camera"></div>
                <div className="display w-full">
                  <div className="artboard artboard-demo phone-1 bg-base-100">
                    <div>
                      <img src={QRCode} className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-control mt-6">
              <Link
                to="/"
                className="btn btn-accent font-primary font-bold text-neutral"
              >
                Vai alla Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
