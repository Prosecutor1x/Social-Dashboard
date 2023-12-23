import { useUserContext } from "@/context/user-context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const RouteProtection2 = ({ children }: Props) => {
  const { user } = useUserContext();
  const { authUser } = useAuth();
  const router = useRouter();

  const redirectTo = async (path: string) => {
    try {
      await router.push(path);
    } catch (error) {
      console.error("Error occurred during route navigation:", error);
    }
  };

  useEffect(() => {
    const routeCheck = async () => {
      if (router.pathname === "/dashboard") {
        try {
          if (!authUser) {
            await redirectTo("/auth/login");
          } else if (authUser && !user?.isProfileComplete) {
            await redirectTo("/auth/register/create-profile");
          }
        } catch (error) {
          console.error("Error occurred during route navigation:", error);
        }
      }
    };

    const loginCheck = async () => {
      if (
        router.pathname === "/auth/login" ||
        router.pathname === "/auth/register" ||
        router.pathname === "/auth/register/create-profile"
      ) {
        try {
          if (authUser && user?.isProfileComplete) {
            await redirectTo("/dashboard");
          } else if (authUser && !user?.isProfileComplete) {
            await redirectTo("/auth/register/create-profile");
          } else if (
            !authUser &&
            router.pathname === "/auth/register/create-profile"
          ) {
            await redirectTo("/auth/login");
          }
        } catch (error) {
          console.error("Error occurred during route navigation:", error);
        }
      }
    };

    routeCheck();
    loginCheck();
  }, [authUser, router.pathname, user?.isProfileComplete]);

  return <>{children}</>;
};

export default RouteProtection2;
