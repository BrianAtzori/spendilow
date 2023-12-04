import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "./features/main/mainSlice";

function App() {
  const result: boolean = useSelector((state) => state.main.value);
  const dispatch = useDispatch();

  return (
    <>
      {result || <h1>Ciao!</h1>}
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
