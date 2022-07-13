import React from "react";
import Step from "../models/Step.Model";
import AdditionalLinkList from "./AdditionalLinkList";
import CookbookContent from "./CookbookContent.component";

interface DetailScreenMainContentProps {
  steps: Step[];
  additionalLinks?: string[];
}

const DetailScreenMainContent: React.FC<DetailScreenMainContentProps> = ({
  steps,
  additionalLinks,
}) => {
  if (additionalLinks) {
    return <AdditionalLinkList links={additionalLinks} />;
  }

  return <CookbookContent steps={steps} />;
};

export default DetailScreenMainContent;
