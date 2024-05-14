import React, { useState } from "react";
import AddBudgetModalComponent from "../budgets/AddBudgetModalComponent";
// import { createNewSpendilowUserBudget } from "../../services/authenticated-users/budgets/auth-usr-budgets-external-calls";

export default function UserBudgetsWidgets() {
  const [modalShowing, setIsModalShowing] = useState(false);

  return (
    <div className="hero tablet:place-items-start">
      <div className="hero-content flex-col gap-3 min-w-full">
        <div className="text-left shadow card card-body bg-base-100 tablet:w-full">
          <h1 className="text-5xl font-bold font-primary">I tuoi budget</h1>
          <div className="flex flex-col gap-10 desktop:flex-row align-middle">
            <div className="font-body flex flex-col gap-3 ">
              <p className="">
                In questa scheda potrai trovare i tuoi budget, ovvero un gruppo
                di transazioni a cui dovresti assegnare un
                <strong> "obiettivo"</strong>, ad esempio comprare l'auto oppure
                un viaggio ✈️
              </p>
              <div className="divider font-primary divider-neutral opacity-50 mx-8 desktop:hidden"></div>
              <ul className="list-disc flex flex-col gap-3">
                <li>
                  Ogni entrata inserita dentro Spendilow di default farà parte
                  del tuo budget <strong>"Risparmi"</strong>
                </li>
                <li>
                  Puoi <strong>creare un budget</strong> con il bottone presente
                  in questa sezione e durante la creazione di una transazione
                  potrai
                  <strong> aggiungere quella transazione a un budget</strong>,
                  tramite l'apposito selettore
                </li>
              </ul>
            </div>
            <button
              className="btn btn-accent font-primary bg-accent mx-auto self-center"
              onClick={() => setIsModalShowing(true)}
            >
              Crea nuovo budget
            </button>
          </div>
        </div>
        <div className="divider font-primary divider-neutral opacity-50 mx-8"></div>
      </div>
      <AddBudgetModalComponent
        visible={modalShowing}
        onClose={() => setIsModalShowing(false)}
      ></AddBudgetModalComponent>
    </div>
  );
}
