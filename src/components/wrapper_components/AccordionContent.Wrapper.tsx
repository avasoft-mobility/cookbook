import React from "react";
import Text from "./Text.wrapperComponent";
import CodeBlock from "./CodeBlock.WrapperComponent";

interface AccordianContentProps {
  content: string;
  code?: string;
  contentColor?: string;
  image?: string;
  imageWidth?: string;
}

const AccordionContent: React.FC<AccordianContentProps> = (props) => {
  return (
    <div>
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
              width: props.imageWidth !== undefined ? props.imageWidth : "100%",
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

export default AccordionContent;
