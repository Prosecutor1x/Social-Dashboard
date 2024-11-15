import { useUserContext } from "@/context/user-context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/context/auth-context";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const RouteProtection = ({ children }: Props) => {
  const { user } = useUserContext();
  const { authUser } = useAuth();
  const router = useRouter();

  const routeCheck = async () => {
    try {
      if (!authUser) {
        await router.push("/auth/login");
      } else if (authUser && !user?.isProfileComplete) {
        await router.push("/auth/register/create-profile");
      }
    } catch (error) {
      // Handle any routing errors here
      console.error("Error occurred during route navigation:", error);
    }
  };
  const loginCheck = async () => {
    try {
      if (authUser && user?.isProfileComplete) {
        await router.push("/dashboard");
      } else if (authUser && !user?.isProfileComplete) {
        await router.push("/auth/register/create-profile");
      } else if (
        !authUser &&
        router.pathname === "/auth/register/create-profile"
      ) {
        await router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error occurred during route navigation:", error);
    }
  };
  useEffect(() => {
    if (router.pathname === "/dashboard") {
      routeCheck();
    } else if (
      router.pathname === "/auth/login" ||
      router.pathname === "/auth/register" ||
      router.pathname === "/auth/register/create-profile"
    ) {
      loginCheck();
    }
  }, [routeCheck, loginCheck]);

  return <>{children}</>;
};

export default RouteProtection;
