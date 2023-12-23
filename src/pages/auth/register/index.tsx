import MainRegister from "@/components/onboarding/register/main-register";
import RouteProtection2 from "@/components/shared/demo-route-protection";
import RouteProtection from "@/components/shared/route-protection";
import React from "react";

const Register = () => {
  return (
    <RouteProtection2>
      <MainRegister />
    </RouteProtection2>
  );
};

export default Register;
