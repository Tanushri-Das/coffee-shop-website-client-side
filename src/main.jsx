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

const queryClient = new QueryClient({
  defaultQueryOptions: {
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
          <Provider store={store}>
            <RouterProvider router={routes} />
          </Provider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
