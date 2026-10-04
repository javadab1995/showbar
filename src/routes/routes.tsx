import { lazy, Suspense } from "react";
import {  type RouteObject } from "react-router-dom";

const PublicLayout = lazy(() => import("../layouts/PublicLayout"));

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));

const PublicThemeLayout = lazy(() => import("../layouts/PublicThemeLayout"));

const AdminThemeLayout = lazy(() => import("../layouts/AdminThemeLayout"));

import ProtectedRoute from "../auth/ProtectedRoute";
import SuperAdminRoute from "../auth/SuperAdminRoute";
import NotFound from "../pages/NotFounde";

const AdminLogin = lazy(() => import("../pages/dashboard/AdminLogin"));
const UpdatePassword = lazy(() => import("../pages/dashboard/UpdatePassword"));

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const AdminLoads = lazy(() => import("../pages/dashboard/AdminLoads"));
const AdminLoadDetails = lazy(
  () => import("../pages/dashboard/AdminLoadDetails"),
);
const LoadForm = lazy(() => import("../pages/dashboard/LoadForm"));

const RequestsPage = lazy(() => import("../pages/dashboard/RequestsPage"));
const RequestDetails = lazy(() => import("../pages/dashboard/RequestDetails"));

const VehiclesPage = lazy(() => import("../pages/dashboard/VehiclesPage"));
const VehicleDetails = lazy(() => import("../pages/dashboard/VehicleDetails"));

const DriversPage = lazy(() => import("../pages/dashboard/DriversPage"));
const DriverDetailsPage = lazy(
  () => import("../pages/dashboard/DriverDetails"),
);

const SettingsPage = lazy(() => import("../pages/dashboard/SettingsPage"));

const StatusPage = lazy(() => import("../pages/dashboard/StatusGuidePage"));

const AddAdmin = lazy(() => import("../pages/dashboard/AddAdmin"));

const Users = lazy(() => import("../pages/dashboard/Users"));

const NotificationList = lazy(
  () => import("../components/notifications/NotificationList"),
);

// Public pages
const PublicLoads = lazy(() => import("../pages/home/PublicLoads"));

const LoadDetails = lazy(() => import("../pages/home/LoadDetails"));

const Basket = lazy(() => import("../pages/home/Basket"));

const RequestSuccess = lazy(() => import("../pages/home/RequestSuccess"));

const NotifyMe = lazy(() => import("../pages/home/NotifyMe"));

const TrackRequest = lazy(() => import("../pages/home/Track"));

const About = lazy(() => import("../pages/home/About"));

const Contact = lazy(() => import("../pages/home/Contact"));

const DriverRequest = lazy(() => import("../pages/home/DriverRequest"));

function RouteLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-sm text-text-2">در حال بارگذاری...</div>
    </div>
  );
}

function LazyPage({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteLoader />}>{children}</Suspense>;
}

export const routes: RouteObject[] = [
  {
    path: "/admin/login",
    element: (
      <LazyPage>
        <AdminLogin />
      </LazyPage>
    ),
  },

  {
    path: "/admin/update-password",
    element: (
      <LazyPage>
        <UpdatePassword />
      </LazyPage>
    ),
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
              {
                index: true,
                element: (
                  <LazyPage>
                    <Dashboard />
                  </LazyPage>
                ),
              },

              {
                path: "loads",
                element: (
                  <LazyPage>
                    <AdminLoads />
                  </LazyPage>
                ),
              },

              {
                path: "loads/new",
                element: (
                  <LazyPage>
                    <LoadForm />
                  </LazyPage>
                ),
              },

              {
                path: "loads/:id",
                element: (
                  <LazyPage>
                    <AdminLoadDetails />
                  </LazyPage>
                ),
              },

              {
                path: "loads/:id/edit",
                element: (
                  <LazyPage>
                    <LoadForm />
                  </LazyPage>
                ),
              },

              {
                path: "notifications",
                element: (
                  <LazyPage>
                    <NotificationList />
                  </LazyPage>
                ),
              },

              {
                path: "requests",
                element: (
                  <LazyPage>
                    <RequestsPage />
                  </LazyPage>
                ),
              },

              {
                path: "requests/:id",
                element: (
                  <LazyPage>
                    <RequestDetails />
                  </LazyPage>
                ),
              },

              {
                path: "vehicles",
                element: (
                  <LazyPage>
                    <VehiclesPage />
                  </LazyPage>
                ),
              },

              {
                path: "vehicles/:id",
                element: (
                  <LazyPage>
                    <VehicleDetails />
                  </LazyPage>
                ),
              },

              {
                path: "drivers",
                element: (
                  <LazyPage>
                    <DriversPage />
                  </LazyPage>
                ),
              },

              {
                path: "drivers/:id",
                element: (
                  <LazyPage>
                    <DriverDetailsPage />
                  </LazyPage>
                ),
              },

              {
                path: "settings",
                element: (
                  <LazyPage>
                    <SettingsPage />
                  </LazyPage>
                ),
              },

              {
                path: "status-guide",
                element: (
                  <LazyPage>
                    <StatusPage />
                  </LazyPage>
                ),
              },

              {
                element: <SuperAdminRoute />,
                children: [
                  {
                    path: "add-admin",
                    element: (
                      <LazyPage>
                        <AddAdmin />
                      </LazyPage>
                    ),
                  },

                  {
                    path: "users",
                    element: (
                      <LazyPage>
                        <Users />
                      </LazyPage>
                    ),
                  },
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
            element: (
              <LazyPage>
                <PublicLoads />
              </LazyPage>
            ),
          },

          {
            path: "loads",
            element: (
              <LazyPage>
                <PublicLoads />
              </LazyPage>
            ),
          },

          {
            path: "loads/:id",
            element: (
              <LazyPage>
                <LoadDetails />
              </LazyPage>
            ),
          },

          {
            path: "basket",
            element: (
              <LazyPage>
                <Basket />
              </LazyPage>
            ),
          },

          {
            path: "request",
            element: (
              <LazyPage>
                <DriverRequest />
              </LazyPage>
            ),
          },

          {
            path: "request/success",
            element: (
              <LazyPage>
                <RequestSuccess />
              </LazyPage>
            ),
          },

          {
            path: "about",
            element: (
              <LazyPage>
                <About />
              </LazyPage>
            ),
          },

          {
            path: "contact",
            element: (
              <LazyPage>
                <Contact />
              </LazyPage>
            ),
          },

          {
            path: "track",
            element: (
              <LazyPage>
                <TrackRequest />
              </LazyPage>
            ),
          },

          {
            path: "notify/:id",
            element: (
              <LazyPage>
                <NotifyMe />
              </LazyPage>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element:<NotFound />,
  },
];
