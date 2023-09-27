import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { StrictMode } from "react";
import { reduxStore } from "./redux/reduxStore";
import { Provider as ReduxProvider } from "react-redux";
import { ApiClientProvider } from "./utils/apiClient";
import { Toaster } from "react-hot-toast";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <ReduxProvider store={reduxStore}>
      <ApiClientProvider>
        <Toaster />
        <App />
      </ApiClientProvider>
    </ReduxProvider>
  </StrictMode>,
);
