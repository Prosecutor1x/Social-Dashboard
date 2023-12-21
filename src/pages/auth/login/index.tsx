import MainLogin from "@/components/onboarding/login/main-login";
import RouteProtection from "@/components/shared/route-protection";

import React from "react";

type Props = {};

const Login = (props: Props) => {
  return (
    <RouteProtection>
      <MainLogin />
    </RouteProtection>
  );
};

export default Login;
