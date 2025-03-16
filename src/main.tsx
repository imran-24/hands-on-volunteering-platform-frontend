import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage } from "./pages/auth/login/page";
import { RegisterPage } from "./pages/auth/register/page";
import NotFound from "./pages/error/page";
import AuthProvider from "./context/auth-provider";
import PublicRoute from "./routes/public-route";
import PrivateRoute from "./routes/private-route";

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

]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
