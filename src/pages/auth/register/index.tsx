import MainRegister from "@/components/onboarding/register/main-register";
import RouteProtection from "@/components/shared/route-protection";
import React from "react";

const Register = () => {
  return (
    <RouteProtection>
      <MainRegister />
    </RouteProtection>
  );
};

export default Register;
