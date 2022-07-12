import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

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
  const routeParams = useParams();
  const [stacks, setStacks] = useState<Stack[]>([]);
  const [selectedStackName, setSelectedStackName] = useState<string>("");
  const [selectedCookbook, setSelectedCookbook] = useState<Cookbook>();

  const { isLoading, data } = useQuery(
    ["topic", routeParams.topicSlug],
    () => {
      if (routeParams.topicSlug) {
        return ApiService.fetchTopic(routeParams.topicSlug);
      }
    },
    {
      onSuccess: (response) => {
        onSuccessfulTopicFetch(response!);
      },
    }
  );

  useEffect(() => {
    onStackSelected(selectedStackName);
  }, [selectedStackName]);

  const onSuccessfulTopicFetch = (response: TopicDetail) => {
    const extractedStacks: Stack[] = [];
    response?.cookbooks.forEach((element: Cookbook) => {
      extractedStacks.push(element.stack);
    });
    setStacks(extractedStacks);

    if (extractedStacks.length > 0) {
      setSelectedStackName(extractedStacks[0].name);
    }
  };

  const onClickMenuItem = (selectedMenu: string) => {
    if (selectedMenu === "Download Code") {
      return window.open(selectedCookbook?.sampleProjectUrl);
    }

    if (selectedMenu === "See Topic Flow") {
      return window.open(data?.flowchartUrl);
    }

    if (selectedMenu === "See Technical Flow") {
      return window.open(selectedCookbook?.flowchartUrl);
    }
  };

  const onStackSelected = (stackName: string) => {
    setSelectedStackName(stackName);
    const cookbook = data?.cookbooks.find(
      (cookbook) => cookbook.stack.name === stackName
    );
    setSelectedCookbook(cookbook!);
  };

  return (
    <div>
      <DrawerLayout
        header={
          <Header
            headerText={data ? data.title : ""}
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
