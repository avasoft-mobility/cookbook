import React from "react";
import StackDetail from "../models/StackDetails.model";
import Accordian from "./wrapper_components/Accordian.WrapperComponent";

interface AccordianProps {
  stackDetails: StackDetail[];
}

const MainContent = () => {
  const result: StackDetail[] = [
    {
      id: 1,
      topic: "Installation of NPM Packages",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      code: "npx react-native init AwesomeTSProject --template react-native-template-typescript",
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
      code: "npx react-native init AwesomeTSProject --template react-native-template-typescript",
    },
  ];
  return (
    <div>
      <Accordian stackDetails={result} />
    </div>
  );
};

export default MainContent;
