import React from "react";
import { Tabs } from "antd";
import RepoList from "./components/RepoList";

const { TabPane } = Tabs;

const App = () => (
  <Tabs defaultActiveKey="1">
    <TabPane tab="All Repositories" key="1">
      <RepoList />
    </TabPane>
    <TabPane tab="Starred Repositories" key="2">
      <RepoList filterStarred />
    </TabPane>
  </Tabs>
);

export default App;
