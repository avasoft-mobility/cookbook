import { LinkPreview } from "@dhaiwat10/react-link-preview";
import React from "react";

interface AdditionalLinkItemProps {
  link: string;
}

const AdditionalLinkItem: React.FC<AdditionalLinkItemProps> = ({ link }) => {
  return (
    <div>
      <LinkPreview url={link} height={350} />
    </div>
  );
};

export default AdditionalLinkItem;
