import React from "react";
import {
  Accordion as MaterialAccordion,
  AccordionDetails,
  AccordionSummary,
  Toolbar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionListProps {
  accordionTitle: React.ReactNode;
  accordionContent: React.ReactNode;
  iconColor?: string;
  expanded: boolean | undefined;
  onChange?: (
    event: React.SyntheticEvent<Element, Event>,
    expanded: boolean
  ) => void;
}

const Accordion: React.FC<AccordionListProps> = (props) => {
  return (
    <div>
      <MaterialAccordion
        expanded={props.expanded}
        onChange={props.onChange}
        sx={{
          boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{
                color:
                  props.iconColor !== undefined ? props.iconColor : "#00000",
              }}
            />
          }
        >
          <div>{props.accordionTitle}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div>{props.accordionContent}</div>
        </AccordionDetails>
      </MaterialAccordion>
      <Toolbar style={{ minHeight: 20 }} />
    </div>
  );
};
export default Accordion;
