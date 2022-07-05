import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

import RouterConfig from "./configs/RouterConfig";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
