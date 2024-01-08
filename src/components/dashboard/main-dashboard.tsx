import React, { useState } from "react";
import TabInfluencer from "./tab-influencer-dashboard";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import Navbar from "../header/navbar/main-navbar";

const MainDashboard = () => {
  const [activeTab, setActiveTab] = useState<string | null>("Influencers");
  const { authUser, logout } = useAuth();
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName === activeTab ? null : tabName);
  };

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="hidden md:flex md:justify-center pb-20 ">
        {/* Sidebar */}
        <div className="fixed h-full left-0 w-1/5 bg-opacity-50 bg-blur-md bg-gray-900  m-2 rounded-lg p-6 text-sm md:text-base  font-semibold ">
          {/* Sidebar tabs */}
          <h2 className="text-lg text-center pb-4 ">logo</h2>
          <ul>
            <li
              className={`cursor-pointer py-2 px-2 rounded-lg text-white hover:text-gray-200  ${
                activeTab === "Influencers" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleTabClick("Influencers")}
            >
              Influencers
            </li>
            <li
              className={`cursor-pointer py-2 px-2 rounded-lg text-white  hover:text-gray-200 ${
                activeTab === "Brands" ? "bg-gray-700" : ""
              }`}
              onClick={() => handleTabClick("Brands")}
            >
              Brands
            </li>
            {/* Add more sidebar tabs as needed */}
          </ul>
          <h2 className="text-lg text-center mt-12">Account</h2>
          <ul>
            <Link href={"/"}>
              <li className="cursor-pointer py-2 px-2 hover:text-gray-200">
                Home
              </li>
            </Link>
            <Link href={"/profile"}>
              <li className="cursor-pointer py-2 px-2 hover:text-gray-200">
                Profile
              </li>
            </Link>
            <li
              className="cursor-pointer py-2 px-2 hover:text-gray-200"
              onClick={handleLogOut}
            >
              Logout
            </li>
          </ul>
          <div className="fixed bottom-20 w-[16vw] border-2 p-6 rounded-xl ">
            <h1 className="text-lg text-center">Need Help?</h1>
            <button className="bg-black p-3 rounded-lg  my-2 w-full">
              Contact Us
            </button>
          </div>
        </div>
        {/* Content */}
        <div className="ml-[20%] h-full ">
          {/* Content corresponding to the active tab */}
          {activeTab === "Influencers" && <TabInfluencer />}
          {activeTab === "Brands" && <p>Brands content here</p>}
          {/* Add content for other tabs similarly */}
        </div>
      </div>

      {/* tabs mobile view */}
      <div>
        <div className="md:hidden ">
          <Navbar />
          <Tabs isFitted variant="soft-rounded" colorScheme="blue">
            <TabList>
              <Tab>Influencers</Tab>
              <Tab>Brands</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <TabInfluencer />
              </TabPanel>
              <TabPanel>
                <p>Brandss</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
