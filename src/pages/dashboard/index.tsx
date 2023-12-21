import MainDashboard from "@/components/dashboard/main-dashboard";
import Navbar from "@/components/header/navbar/main-navbar";
import PageLayout from "@/components/shared/pagelayout";
import RouteProtection from "@/components/shared/route-protection";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <RouteProtection>
      <PageLayout>
        <MainDashboard />
      </PageLayout>
    </RouteProtection>
  );
};

export default Dashboard;
