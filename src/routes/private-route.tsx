import { Navigate, Outlet } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/context/auth-provider";
import Sidebar from "@/layouts/sidebar";
import Spinner from "@/components/spinner";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/context/query-provider";

// Define props type
interface PrivateRouteProps {
  children?: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to='/auth/login' replace />;

  return children ? (
    <div>
      <Sidebar>
        <QueryProvider>
          <main className="p-4">{children}</main>
        </QueryProvider>

        <Toaster />
      </Sidebar>
    </div>
  ) : (
    <Outlet />
  );
};

export default PrivateRoute;
