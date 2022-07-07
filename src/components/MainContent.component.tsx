import React from "react";
import Step from "../models/Step.Model";
import AccordionList from "./wrapper_components/AccordionList.WrapperComponent";

interface MainContentProps {
  steps: Step[];
}
const MainContent: React.FC<MainContentProps> = (props) => {
  return (
    <div>
      <AccordionList steps={props.steps} />
    </div>
  );
};

export default MainContent;
