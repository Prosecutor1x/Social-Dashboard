import MainCreateProfile from "@/components/onboarding/register/main-create-profile";
import RouteProtection2 from "@/components/shared/demo-route-protection";
import RouteProtection from "@/components/shared/route-protection";
import React from "react";

const CreateProfile = () => {
  return (
    <RouteProtection2>
      <MainCreateProfile />
    </RouteProtection2>
  );
};

export default CreateProfile;
