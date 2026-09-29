import { Navigate, type RouteObject } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import PublicThemeLayout from "../layouts/PublicThemeLayout";
import AdminThemeLayout from "../layouts/AdminThemeLayout";


import { AdminLoads } from "../pages/dashboard/AdminLoads";
import { AdminLoadDetails } from "../pages/dashboard/AdminLoadDetails";
import { RequestsPage } from "../pages/dashboard/RequestsPage";
import { RequestDetails } from "../pages/dashboard/RequestDetails";
import { VehicleDetails } from "../pages/dashboard/VehicleDetails";
import { DriversPage } from "../pages/dashboard/DriversPage";
import { SettingsPage } from "../pages/dashboard/SettingsPage";
import { LoadForm } from "../pages/dashboard/LoadForm";
import VehiclesPage from "../pages/dashboard/VehiclesPage";
import { DriverDetailsPage } from "../pages/dashboard/DriverDetails";
import AdminLogin from "../pages/dashboard/AdminLogin";
import UpdatePassword from "../pages/dashboard/UpdatePassword";

import { PublicLoads } from "../pages/home/PublicLoads";
import { LoadDetails } from "../pages/home/LoadDetails";
import { Basket } from "../pages/home/Basket";
import { RequestSuccess } from "../pages/home/RequestSuccess";
import { NotifyMe } from "../pages/home/NotifyMe";
import TrackRequest from "../pages/home/Track";
import About from "../pages/home/About";
import Contact from "../pages/home/Contact";
import DriverRequest from "../pages/home/DriverRequest";

import NotificationList from "../components/notifications/NotificationList";

import ProtectedRoute from "../auth/ProtectedRoute";
import AddAdmin from "../pages/dashboard/AddAdmin";
import Users from "../pages/dashboard/Users";
import Dashboard from "../pages/dashboard/Dashboard";
import SuperAdminRoute from "../auth/SuperAdminRoute";
import StatusPage from "../pages/dashboard/StatusGuidePage";

export const routes: RouteObject[] = [
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  {
    path: "/admin/update-password",
    element: <UpdatePassword />,
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminThemeLayout />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <Dashboard /> },

              { path: "loads", element: <AdminLoads /> },
              { path: "loads/new", element: <LoadForm /> },
              { path: "loads/:id", element: <AdminLoadDetails /> },
              { path: "loads/:id/edit", element: <LoadForm /> },

              { path: "notifications", element: <NotificationList /> },
              { path: "requests", element: <RequestsPage /> },
              { path: "requests/:id", element: <RequestDetails /> },

              { path: "vehicles", element: <VehiclesPage /> },
              { path: "vehicles/:id", element: <VehicleDetails /> },

              { path: "drivers", element: <DriversPage /> },
              { path: "drivers/:id", element: <DriverDetailsPage /> },

              { path: "settings", element: <SettingsPage /> },

              { path: "status-guide", element: <StatusPage /> },

              {
                element: <SuperAdminRoute />,
                children: [
                  {
                    path: "add-admin",
                    element: <AddAdmin />,
                  },
                  { path: "users", element: <Users /> },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <PublicThemeLayout />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <PublicLoads />,
          },

          {
            path: "loads",
            element: <PublicLoads />,
          },

          {
            path: "loads/:id",
            element: <LoadDetails />,
          },

          {
            path: "basket",
            element: <Basket />,
          },

          {
            path: "request",
            element: <DriverRequest />,
          },

          {
            path: "request/success",
            element: <RequestSuccess />,
          },

          {
            path: "about",
            element: <About />,
          },

          {
            path: "contact",
            element: <Contact />,
          },

          {
            path: "track",
            element: <TrackRequest />,
          },

          {
            path: "notify/:id",
            element: <NotifyMe />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
