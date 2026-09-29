import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { routes } from "./routes/routes";
import { AuthProvider } from "./auth/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />

        <RouterProvider router={router} />

        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            success: {
              duration: Infinity,
            },
            error: {
              duration: 10000,
            },
            style: {
              fontSize: "16px",
              // backgroundColor: "var(--color-background)",
              // color: "#0D674E",
              // zIndex: 999,
              // border: "1px solid var(--color-gray-200)",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
