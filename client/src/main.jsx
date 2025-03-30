import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ProvideTheme from "./components/ProvideTheme.jsx";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ProvideTheme>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <Toaster position="bottom-left" />
      </ProvideTheme>
    </Provider>
  </PersistGate>
);
