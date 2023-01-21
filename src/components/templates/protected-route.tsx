import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [authorized, setAuthorized] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, [session.status]);

  if (!authorized) {
    return <div>Unauthorized</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
