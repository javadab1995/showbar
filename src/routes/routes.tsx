import { Navigate, RouteObject } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import { AdminLogin } from "../pages/dashboard/AdminLogin";
import AdminLayout from "../layouts/AdminLayout";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { AdminLoads } from "../pages/dashboard/AdminLoads";
import { LoadForm } from "../pages/dashboard/LoadForm";
import { AdminLoadDetails } from "../pages/dashboard/AdminLoadDetails";
import { RequestsPage } from "../pages/dashboard/RequestsPage";
import { RequestDetails } from "../pages/dashboard/RequestDetails";
import { VehiclesPage } from "../pages/dashboard/VehiclesPage";
import { VehicleDetails } from "../pages/dashboard/VehicleDetails";
import { DriversPage } from "../pages/dashboard/DriversPage";
import { SettingsPage } from "../pages/dashboard/SettingsPage";
import { PublicLoads } from "../pages/home/PublicLoads";
import { LoadDetails } from "../pages/home/LoadDetails";
import { Basket } from "../pages/home/Basket";
import { DriverRequest } from "../pages/home/DriverRequest";
import { RequestSuccess } from "../pages/home/RequestSuccess";
import { NotifyMe } from "../pages/home/NotifyMe";
import TrackRequest from "../pages/home/Track";
import About from "../pages/home/About";
import Contact from "../pages/home/Contact";

export const routes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "loads", element: <AdminLoads /> },
      { path: "loads/new", element: <LoadForm /> },
      { path: "loads/:id", element: <AdminLoadDetails /> },
      { path: "loads/:id/edit", element: <LoadForm /> },
      { path: "requests", element: <RequestsPage /> },
      { path: "requests/:id", element: <RequestDetails /> },
      { path: "vehicles", element: <VehiclesPage /> },
      { path: "vehicles/:id", element: <VehicleDetails /> },
      { path: "drivers", element: <DriversPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <PublicLoads /> },
      { path: "loads", element: <PublicLoads /> },
      { path: "loads/:id", element: <LoadDetails /> },
      { path: "basket", element: <Basket /> },
      { path: "request", element: <DriverRequest /> },
      { path: "request/success", element: <RequestSuccess /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "track", element: <TrackRequest /> },

      { path: "notify/:id", element: <NotifyMe /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];