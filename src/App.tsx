import { lazy } from "react";

const ReactQueryDevtools = lazy(() =>
  import("@tanstack/react-query-devtools").then((m) => ({
    default: m.ReactQueryDevtools,
  })),
);
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { routes } from "./routes/routes";
import { AuthProvider } from "./auth/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      refetchOnReconnect: true,
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
              duration: 3000,
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
