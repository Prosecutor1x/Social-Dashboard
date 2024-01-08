import MainDashboard from "@/components/dashboard/main-dashboard";
import Navbar from "@/components/header/navbar/main-navbar";
import Sidebar from "@/components/header/sidebar/main-sidebar";
import RouteProtection2 from "@/components/shared/demo-route-protection";
import PageLayout from "@/components/shared/pagelayout";
import RouteProtection from "@/components/shared/route-protection";
import React from "react";

const Dashboard = () => {
  return (
    <RouteProtection2>
      <PageLayout>
        <MainDashboard />
      </PageLayout>
    </RouteProtection2>
  );
};

export default Dashboard;
