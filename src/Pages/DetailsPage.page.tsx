import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainContent from "../components/MainContent.component";
import SideBar from "../components/SideBar.Component";
import DrawerLayout from "../components/wrapper_components/DrawerLayout.WrapperComponent";
import Header from "../components/wrapper_components/Header.Wrapper.component";

import Cookbook from "../models/Cookbook.Model";
import Stack from "../models/Stack.Model";
import TopicDetail from "../models/TopicDetail.Model";

import ApiService from "../services/ApiService";

const DetailsPage: React.FC = () => {
  let [topic, setTopic] = useState<TopicDetail>();

  const [selectedStackName, setSelectedStackName] = useState<string>("");
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [selectedCookbook, setSelectedCookbook] = useState<Cookbook>();

  const routeParams = useParams();

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialize = () => {
    try {
      if (routeParams.topicSlug === undefined) {
        return;
      }

      const selectedTopic = ApiService.fetchTopic(routeParams.topicSlug);
      setTopic(selectedTopic);

      const extractedStacks: Stack[] = [];
      selectedTopic.cookbooks.forEach((element: Cookbook) => {
        extractedStacks.push(element.stack);
      });
      setStacks(extractedStacks);
    } catch (error) {}
  };

  const onClickMenuItem = (selectedMenu: string) => {
    if (selectedMenu === "Download Code") {
      return window.open("https://www.microsoft.com");
    }

    if (selectedMenu === "See Topic Flow") {
      return window.open("https://www.microsoft.com");
    }

    if (selectedMenu === "See Technical Flow") {
      return window.open("https://www.google.com");
    }
  };

  const onStackSelected = (stackName: string) => {
    setSelectedStackName(stackName);
    const cookbook = topic?.cookbooks.find(
      (cookbook) => cookbook.stack.name === stackName
    );
    setSelectedCookbook(cookbook!);
  };

  return (
    <div>
      <DrawerLayout
        header={
          <Header
            headerText={topic ? topic.title : ""}
            onClickMenuItem={onClickMenuItem}
            headerHeight="55px"
          />
        }
        leftNavigation={
          <SideBar
            selectedStack={selectedStackName}
            stacks={stacks}
            onSelect={onStackSelected}
          />
        }
        mainContent={
          <MainContent steps={selectedCookbook ? selectedCookbook.steps : []} />
        }
      />
    </div>
  );
};

export default DetailsPage;
