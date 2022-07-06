import React from "react";
import { AccordionDetails } from "@mui/material";
import Text from "./Text.wrapperComponent";

interface AccordianContentProps {
  content: string;
}

const AccordianContent: React.FC<AccordianContentProps> = (props) => {
  return (
    <div>
      <AccordionDetails>
        <Text variant={"subtitle2"} color={"#424242"}>{props.content}</Text>
      </AccordionDetails>
    </div>
  );
};

export default AccordianContent;
