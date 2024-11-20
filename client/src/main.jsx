import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProvideTheme from "./components/ProvideTheme.jsx";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ProvideTheme>
          <App />
        </ProvideTheme>
      </Provider>
    </PersistGate>
  </StrictMode>
);
