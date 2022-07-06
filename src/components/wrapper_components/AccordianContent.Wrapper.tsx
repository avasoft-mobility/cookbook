import React from "react";
import { AccordionDetails } from "@mui/material";
import Text from "./Text.wrapperComponent";
import CodeBlock from "./CodeBlock.WrapperComponent";

interface AccordianContentProps {
  content: string;
  code?: string;
  contentColor?: string;
  image?: string;
  imageWidth?: string;
}

const AccordianContent: React.FC<AccordianContentProps> = (props) => {
  return (
    <div>
      <AccordionDetails>
        <Text
          variant={"subtitle2"}
          color={
            props.contentColor !== undefined ? props.contentColor : "#000000"
          }
        >
          {props.content}
        </Text>
        {props.image !== undefined && (
          <div style={styles.imageContainer}>
            <img
              style={{
                width:
                  props.imageWidth !== undefined ? props.imageWidth : "100%",
              }}
              src={props.image}
            />
          </div>
        )}
        {props.code !== undefined && (
          <div style={styles.codeBlockContainer}>
            <CodeBlock code={props.code} language={"tsx"} />
          </div>
        )}
      </AccordionDetails>
    </div>
  );
};
const styles = {
  codeBlockContainer: {
    marginTop: "10px",
  },
  imageContainer: {
    marginTop: "10px",
  },
};

export default AccordianContent;
