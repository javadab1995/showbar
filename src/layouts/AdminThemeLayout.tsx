import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";
import { Toaster } from "react-hot-toast";

export default function AdminThemeLayout() {
  return (
    <ThemeProvider storageKey="showbar-admin-theme">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Outlet />
    </ThemeProvider>
  );
}
