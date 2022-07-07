import React from "react";
import Step from "../models/Step.Model";
import AccordionList from "./wrapper_components/AccordionList.WrapperComponent";

interface MainContentProps {
  step: Step[];
}
const MainContent: React.FC<MainContentProps> = (props) => {
  return (
    <div>
      <AccordionList step={props.step} />
    </div>
  );
};

export default MainContent;
