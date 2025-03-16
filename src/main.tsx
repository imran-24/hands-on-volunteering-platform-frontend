import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/auth/login/page";
import { RegisterPage } from "./pages/auth/register/page";
import NotFound from "./pages/error/page";
import ProfilePage from "./pages/profile/page";
import AuthProvider from "./context/auth-provider";
import PublicRoute from "./routes/public-route";
import PrivateRoute from "./routes/private-route";
import CreateEventPage from "./pages/events/create/page";
import EventsPage from "./pages/events/page";
import EventDetailsPage from "./pages/events/details/page";
import CommunityHelpPostsPage from "./pages/posts/page";
import TeamsPage from "./pages/teams/page";
import DashboardPage from "./pages/dashboard/page";
import HomePage from "./App";

const router = createBrowserRouter([
  {
    
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/auth/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "/create-event",
    element: (
      <PrivateRoute>
        <CreateEventPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/help-requests",
    element: (
      <PrivateRoute>
        <CommunityHelpPostsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/events",
    element: (
      <PrivateRoute>
        <EventsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/events/:id",
    element: (
      <PrivateRoute>
        <EventDetailsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/teams",
    element: (
      <PrivateRoute>
        <TeamsPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
