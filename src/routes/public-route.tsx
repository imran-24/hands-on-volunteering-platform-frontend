import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth-provider";
import Spinner from "@/components/spinner";
import { Toaster } from "@/components/ui/sonner";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();


  if (loading) return <Spinner />;

  return user ? (
    <Navigate to='/' replace />
  ) : (
    <>
      <main>{children}</main>
      <Toaster />
    </>
  );
};

export default PublicRoute;
