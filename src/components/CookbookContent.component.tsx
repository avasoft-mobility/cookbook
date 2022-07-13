import React from "react";
import Step from "../models/Step.Model";
import AccordionList from "./wrapper_components/AccordionList.WrapperComponent";

interface CookbookContentProps {
  steps: Step[];
}
const CookbookContent: React.FC<CookbookContentProps> = (props) => {
  return (
    <div>
      <AccordionList steps={props.steps} />
    </div>
  );
};

export default CookbookContent;
