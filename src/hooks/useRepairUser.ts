import { useAuth0 } from "@auth0/auth0-react";

export function useRepairUser() {
  const { user, isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

  return {
    sub: user?.sub || "",
    name: user?.name || "",
    picture: user?.picture || "",
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout,
  };
}
