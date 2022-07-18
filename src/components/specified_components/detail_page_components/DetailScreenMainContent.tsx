import React from "react";
import Cookbook from "../../../models/Cookbook.Model";
import AdditionalLinkList from "../additional_link_components/AdditionalLinkList";
import CookbookContent from "./CookbookContent.component";

interface DetailScreenMainContentProps {
  cookbook?: Cookbook;
  additionalLinks?: string[];
}

const DetailScreenMainContent: React.FC<DetailScreenMainContentProps> = ({
  cookbook,
  additionalLinks,
}) => {
  if (additionalLinks) {
    return <AdditionalLinkList links={additionalLinks} />;
  }

  return <CookbookContent cookbook={cookbook} />;
};

export default DetailScreenMainContent;
