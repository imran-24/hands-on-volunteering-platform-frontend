import { Navigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/auth-provider";

function HomePage() {
  const { user } = useAuth();

  if (!user) return <Navigate to='/login' replace />;

  return <Navigate to='/dashboard' replace />;

}

export default HomePage;
