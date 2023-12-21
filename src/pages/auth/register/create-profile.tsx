import MainCreateProfile from "@/components/onboarding/register/main-create-profile";
import RouteProtection from "@/components/shared/route-protection";
import React from "react";

const CreateProfile = () => {
  return (
    <RouteProtection>
      <MainCreateProfile />
    </RouteProtection>
  );
};

export default CreateProfile;
