import React from "react";
import {
  Accordion as MaterialAccordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionListProps {
  accordionTitle: React.ReactNode;
  accordionContent: React.ReactNode;
  iconColor?: string;
}

const Accordion: React.FC<AccordionListProps> = (props) => {
  return (
    <div>
      <MaterialAccordion
        sx={{
          marginTop: 3,
          marginBottom: 3,
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={
                props.iconColor !== undefined
                  ? { color: props.iconColor }
                  : { color: "#000000" }
              }
            />
          }
        >
          <div>{props.accordionTitle}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div>{props.accordionContent}</div>
        </AccordionDetails>
      </MaterialAccordion>
    </div>
  );
};

export default Accordion;
