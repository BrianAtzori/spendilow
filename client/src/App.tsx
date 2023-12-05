// ------ REACT ------
import React from "react";

// ------ COMPONENTS & PAGES ------
import Loader from "./components/shared/Loader";

// ------ REDUX ------
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "./redux/reducers/main/mainSlice";

function App() {
  const result: boolean = useSelector((state) => state.main.value);
  const dispatch = useDispatch();

  return (
    <>
      <Loader
        isLoading={result}
        message={"Controllo il collegamento ai server di Spendilow 💰"}
      ></Loader>
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(changeState());
        }}
      >
        Premi qui
      </button>
    </>
  );
}

export default App;
