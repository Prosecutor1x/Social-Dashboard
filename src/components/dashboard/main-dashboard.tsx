import { useUserContext } from "@/context/user-context";
import { IInfluencerProfile } from "@/models/influencer-profile";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import TabInfluencer from "./tab-influencer-dashboard";

const MainDashboard = () => {
  return (
    <div>
      <Tabs isFitted variant="soft-rounded" colorScheme="teal">
        <TabList mb="2em">
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
  );
};

export default MainDashboard;
