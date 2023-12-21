import MainDashboard from "@/components/dashboard/main-dashboard";
import Navbar from "@/components/header/navbar/main-navbar";
import PageLayout from "@/components/shared/pagelayout";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
      <PageLayout>
        <MainDashboard />
      </PageLayout>
    </div>
  );
};

export default Dashboard;
