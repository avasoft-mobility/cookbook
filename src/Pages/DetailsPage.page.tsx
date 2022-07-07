import React, { useState } from "react";
import DrawerLayout from "../components/wrapper_components/DrawerLayout.WrapperComponent";
import Header from "../components/wrapper_components/Header.Wrapper.component";
import SideBar from "../components/SideBar.Component";
import StackDetail from "../models/StackDetails.model";
import MainContent from "../components/MainContent.component";
const DetailsPage = () => {
  const result: StackDetail[] = [
    {
      id: 1,
      topic: "Installation of NPM Packages",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      code: "npx react-native init AwesomeTSProject --template react-native-template-typescript \nnpx react-native init AwesomeTSProject --template react-native-template-typescript",
      image: "https://www.tutorialspoint.com/android/images/architecture.jpg",
    },
    {
      id: 2,
      topic: "Configure Notification on App.tsx",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    },
    {
      id: 3,
      topic: "Integrating with Firebase",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      code: "function trigger() \n{\n document.getElementById('hover').addEventListener('mouseover', popup);\nfunction popup()\n{\nalert('Welcome to my WebPage!!!');\n}\n} ",
    },
  ];
  let [stackTopic, setStackTopic] = useState("React Native");
  const onClickMenuItem = (menu: string) => {
    //When the user clicks the Menu Item
  };
  const onSelectStack = (stackName: string) => {
    setStackTopic(stackName);
  };
  return (
    <div>
      <DrawerLayout
        header={
          <Header
            headerText="Push Notification Implementation"
            onClickMenuItem={onClickMenuItem}
            headerHeight="55px"
          />
        }
        leftNavigation={
          <SideBar
            selectedTopic={stackTopic}
            Topics={[
              "React Native",
              "Native Android",
              "Native Ios",
              "Flutter",
              "Xamarin Forms",
            ]}
            onSelect={onSelectStack}
          />
        }
        mainContent={<MainContent stackDetails={result} />}
      />
    </div>
  );
};

export default DetailsPage;
