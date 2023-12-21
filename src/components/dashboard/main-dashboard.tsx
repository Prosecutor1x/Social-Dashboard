import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";

type Props = {};

const MainDashboard = (props: Props) => {
  return (
    <div>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>One</Tab>
          <Tab>Two</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default MainDashboard;
