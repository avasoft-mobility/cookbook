import { AccordionSummary, Typography } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Text from "./Text.wrapperComponent";

interface AccordianTitleProps {
  id: number;
  title: string;
  iconColor?: string;
  idColor?: string;
  titleColor?: string;
}

const AccordianTitle: React.FC<AccordianTitleProps> = (props) => {
  return (
    <div>
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
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text
            variant={"subtitle1"}
            color={props.idColor !== undefined ? props.idColor : "#000000"}
          >
            #{props.id}
          </Text>
          <Text
            variant={"subtitle1"}
            color={
              props.titleColor !== undefined ? props.titleColor : "#000000"
            }
          >
            - {props.title}
          </Text>
        </div>
      </AccordionSummary>
    </div>
  );
};

export default AccordianTitle;
