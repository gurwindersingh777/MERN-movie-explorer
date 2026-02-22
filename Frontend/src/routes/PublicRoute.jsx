import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth";
import { Spinner } from "../components/Component";

export default function PublicRoute({ children }) {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (data?.user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
