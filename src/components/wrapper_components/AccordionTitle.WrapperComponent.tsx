import React from "react";
import Text from "./Text.wrapperComponent";

interface AccordianTitleProps {
  id: string;
  title: string;
  idColor?: string;
  titleColor?: string;
}

const AccordionTitle: React.FC<AccordianTitleProps> = (props) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Text
        variant={"subtitle1"}
        color={props.idColor !== undefined ? props.idColor : "#000000"}
      >
        #{props.id}&nbsp;
      </Text>
      <Text
        variant={"subtitle1"}
        color={props.titleColor !== undefined ? props.titleColor : "#000000"}
      >
        - {props.title}
      </Text>
    </div>
  );
};

export default AccordionTitle;
