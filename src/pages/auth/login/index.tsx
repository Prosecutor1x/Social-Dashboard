import MainLogin from "@/components/onboarding/login/main-login";
import RouteProtection2 from "@/components/shared/demo-route-protection";
import RouteProtection from "@/components/shared/route-protection";

import React from "react";

const Login = () => {
  return (
    <RouteProtection2>
      <MainLogin />
    </RouteProtection2>
  );
};

export default Login;
