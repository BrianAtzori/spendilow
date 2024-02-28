// ------ REACT ------
import React, { useState } from "react";

// ------ PAGES & COMPONENTS ------
import NoResultsComponent from "./NoResultsComponent";

//A responsive card to contain data or the no result component

export default function DataDisplayerComponent() {
  const [noResults] = useState(true);

  return (
    //TODO: Props should be:
    //? Titolo
    //? Sottotiolo
    //? Data to render
    <>
      <div className="hero">
        <div className="hero-content flex-col gap-3 min-w-full ">
          <div className="shadow card card-body bg-base-100 w-full">
            <h1 className="text-5xl font-bold font-primary">Le tue spese</h1>
            <div className="font-body">
              <p className="py-">
                Dai un'occhiata alle spese degli ultimi 30 giorni 🗓️
              </p>
            </div>
            <div className="py-8">
              {noResults && <NoResultsComponent></NoResultsComponent>}
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
