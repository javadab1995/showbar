import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../contexts/ThemeContext";

export default function PublicThemeLayout() {
  return (
    <ThemeProvider storageKey="showbar-public-theme">
      <Outlet />
    </ThemeProvider>
  );
}
