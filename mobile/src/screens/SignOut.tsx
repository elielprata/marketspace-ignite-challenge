import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";

export function SignOut() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  return null;
}
