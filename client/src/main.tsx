// ------ REACT ------
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// ------ STYLES AND COMPONENTS ------
import App from "./App.tsx";
import "./index.css";

// ------ REDUX ------
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* //TODO: Fix this with env variable */}
    <BrowserRouter basename="/spendilow">
      <App />
    </BrowserRouter>
  </Provider>
);
