import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes/Routes.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import AuthProvider from "./Contexts/AuthProvider/AuthProvider.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./Contexts/ThemeProvider/ThemeProvider.jsx";

const queryClient = new QueryClient({
  defaultQueryOptions: {
    // Use 'defaultQueryOptions' instead of 'defaultOptions'
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <ThemeProvider>
            <Provider store={store}>
              <RouterProvider router={routes} />
            </Provider>
          </ThemeProvider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
