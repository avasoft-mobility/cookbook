import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

import { useParams } from "react-router-dom";
import DetailScreenMainContent from "../components/DetailScreenMainContent";

import SideBar from "../components/SideBar.Component";
import DrawerLayout from "../components/wrapper_components/DrawerLayout.WrapperComponent";
import Header from "../components/wrapper_components/Header.Wrapper.component";

import Cookbook from "../models/Cookbook.Model";
import Stack from "../models/Stack.Model";
import TopicDetail from "../models/TopicDetail.Model";

import ApiService from "../services/ApiService";
import ErrorResponse from "../models/request_response_models/Error.Response.model";
import { AxiosError } from "axios";
import useErrorSnackbar from "../hooks/useErrorSnackbar.hook";

const DetailsPage: React.FC = () => {
  const showErrorSnackBar = useErrorSnackbar();

  const routeParams = useParams();

  const [stacks, setStacks] = useState<Stack[]>([]);
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [selectedCookbook, setSelectedCookbook] = useState<Cookbook>();
  const [isSideBarOpened, setSideBarMenuClicked] = useState(false);

  const { isLoading, data } = useQuery(
    ["topic", routeParams.topicSlug],
    () => {
      if (routeParams.topicSlug) {
        return ApiService.fetchTopic(routeParams.topicSlug);
      }
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        onSuccessfulTopicFetch(response!);
      },
      onError: (error: AxiosError) => {
        showErrorSnackBar((error.response?.data as ErrorResponse).message);
      },
    }
  );

  useEffect(() => {
    onSidebarItemSelected(selectedItemName);
  }, [selectedItemName]);

  const onSuccessfulTopicFetch = (response: TopicDetail) => {
    const extractedStacks: Stack[] = [];
    response?.cookbooks.forEach((element: Cookbook) => {
      extractedStacks.push(element.stack);
    });
    setStacks(extractedStacks);

    if (extractedStacks.length > 0) {
      setSelectedItemName(extractedStacks[0].name);
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

  const onSidebarItemSelected = (selectedItem: string) => {
    setSelectedItemName(selectedItem);
    isSideBarOpened && toggleSideBar();

    if (selectedItem === "additional_links") {
      return;
    }

    const cookbook = data?.cookbooks.find(
      (cookbook) => cookbook.stack.name === selectedItem
    );
    setSelectedCookbook(cookbook!);
  };

  const onSideBarMenuClick = () => {
    toggleSideBar();
  };

  const toggleSideBar = () => {
    setSideBarMenuClicked(!isSideBarOpened);
  };

  return (
    <div>
      <DrawerLayout
        isSideBarOpened={isSideBarOpened}
        toggleSideBar={toggleSideBar}
        header={
          <Header
            headerText={data ? data.title : ""}
            onClickMenuItem={onClickMenuItem}
            headerHeight="55px"
            onSideBarMenuClick={onSideBarMenuClick}
          />
        }
        leftNavigation={
          <SideBar
            selectedStack={selectedItemName}
            stacks={stacks}
            onSelect={onSidebarItemSelected}
          />
        }
        mainContent={
          <DetailScreenMainContent
            steps={selectedCookbook ? selectedCookbook.steps : []}
            additionalLinks={
              selectedItemName === "additional_links"
                ? data?.referenceUrls
                : undefined
            }
          />
        }
      />
    </div>
  );
};

export default DetailsPage;
