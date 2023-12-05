// ------ REACT ------
import React from "react";
import { Link } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import Loader from "../../components/shared/Loader";

// ------ REDUX ------
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { changeState } from "../../redux/reducers/main/mainSlice";

//! This component manage user redirection, if server is alive check if user is logged, if it's logged go to app or go to auth picker
export default function Splash() {
  const result: boolean = useAppSelector((state) => state.main.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <Loader
        isLoading={result}
        message={"Controllo il collegamento ai server di Spendilow 💰"}
      ></Loader>
      <button
        className="btn btn-primary font-heading"
        onClick={() => {
          dispatch(changeState());
        }}
      >
        Premi qui
      </button>
      <div className="bg-red-400 tablet:bg-blue-500 desktop:bg-secondary desktop-l:bg-slate-400 desktop-4k:bg-error">
        <h1 className="font-primary">Titolo</h1>
        <h2 className="font-heading">Titoletto</h2>
        <p className="font-body">Paragrafo</p>
      </div>
    </>
  );
}
