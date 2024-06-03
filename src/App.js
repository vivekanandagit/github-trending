import React from "react";
import { Tabs } from "antd";
import styled from "styled-components";
import RepoList from "./components/RepoList";

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 16px;
  }

  .ant-tabs-tab {
    font-size: 16px;
    font-weight: bold;
  }

  .ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #1890ff;
  }

  .ant-tabs-ink-bar {
    background-color: #1890ff;
  }
`;

const AppContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

const App = () => (
  <AppContainer>
    <StyledTabs defaultActiveKey="1">
      <TabPane tab="All Repositories" key="1">
        <RepoList />
      </TabPane>
      <TabPane tab="Starred Repositories" key="2">
        <RepoList filterStarred />
      </TabPane>
    </StyledTabs>
  </AppContainer>
);

export default App;
