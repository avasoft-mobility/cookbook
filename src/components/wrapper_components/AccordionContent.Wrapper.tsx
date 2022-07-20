import React from "react";
import Text from "./Text.wrapperComponent";
import CodeBlock from "./CodeBlock.WrapperComponent";
import Linkify from "react-linkify";
import { height, maxHeight } from "@mui/system";

interface AccordianContentProps {
  content: string;
  code?: string;
  contentColor?: string;
  image?: string;
  imageStyle?: React.CSSProperties;
}

const AccordionContent: React.FC<AccordianContentProps> = (props) => {
  return (
    <Linkify>
      <Text
        variant={"subtitle2"}
        color={
          props.contentColor !== undefined ? props.contentColor : "#000000"
        }
      >
        {props.content}
      </Text>
      {props.image !== undefined && props.image!.trim() !== "" && (
        <div style={styles.imageContainer}>
          <img
            style={
              props.imageStyle !== undefined
                ? props.imageStyle
                : { maxHeight: "600px", width: "auto", maxWidth: "100%" }
            }
            src={props.image}
            alt="could not found"
          />
        </div>
      )}
      {props.code !== undefined && props.code!.trim() !== "" && (
        <div style={styles.codeBlockContainer}>
          <CodeBlock code={props.code} language={"tsx"} />
        </div>
      )}
    </Linkify>
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

export default AccordionContent;
