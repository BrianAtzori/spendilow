// ------ REACT ------
import React from "react";
import ReactDOM from "react-dom/client";

// ------ STYLES AND COMPONENTS ------
import App from "./App.tsx";
import "./index.css";

// ------ REDUX ------
import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
