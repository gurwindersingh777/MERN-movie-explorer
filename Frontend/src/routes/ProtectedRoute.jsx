import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";



export default function ProtectedRoute({ children }) {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return <div className="w-full h-full flex justify-center items-center"><Spinner /></div>;
  }

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
