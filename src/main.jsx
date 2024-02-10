import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import "./index.css";
import ToggleModeProvider from "./utils/ToggleMode.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToggleModeProvider>
    </Provider>
  </React.StrictMode>
);
