import React from "react";
import StackDetail from "../models/StackDetails.model";
import AccordionList from "./wrapper_components/AccordianList.WrapperComponent";

interface MainContentProps {
  stackDetails: StackDetail[];
}
const MainContent: React.FC<MainContentProps> = (props) => {
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
  return (
    <div>
      <AccordionList stackDetails={result} />
    </div>
  );
};

export default MainContent;
