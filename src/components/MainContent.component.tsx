import React from "react";
import StackDetail from "../models/StackDetails.model";
import AccordionList from "./wrapper_components/AccordionList.WrapperComponent";

interface MainContentProps {
  stackDetails: StackDetail[];
}
const MainContent: React.FC<MainContentProps> = (props) => {
  return (
    <div>
      <AccordionList stackDetails={props.stackDetails} />
    </div>
  );
};

export default MainContent;
