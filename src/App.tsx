import React from "react";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import RouterConfig from "./configs/RouterConfig";

import Theme from "./configs/ThemeConfig";
import { SnackbarProvider } from "notistack";
const queryClient = new QueryClient();

function App() {
  return (
    <SnackbarProvider maxSnack={10} preventDuplicate>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider theme={Theme}>
            <RouterConfig />
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
