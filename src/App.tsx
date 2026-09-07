import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {Toaster} from "react-hot-toast"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
    staleTime:0,
  }
}
})

const router = createBrowserRouter(routes);

export default function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            backgroundColor: "var(--color-background)",
            color: "var(--color-text) ",
            zIndex: 999,
          },
        }}
      />
    </QueryClientProvider>
  );
}
