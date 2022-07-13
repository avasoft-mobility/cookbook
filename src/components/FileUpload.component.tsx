import React from "react";
import Text from "./wrapper_components/Text.wrapperComponent";
interface FileUploadProps {
  headerText: string;
  textVariant:
    | "body1"
    | "body2"
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "overline"
    | "subtitle1"
    | "subtitle2";
  textColor: string;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  onChange: Function;
  fileUploadStyles?: React.CSSProperties;
}

const FileUpload: React.FC<FileUploadProps> = (props) => {
  return (
    <div>
      <Text
        variant={props.textVariant}
        color={props.textColor}
        gutterBottom={props.gutterBottom}
        noWrap={props.noWrap}
        paragraph={props.paragraph}
      >
        {props.headerText}
      </Text>
      <input
        style={
          props.fileUploadStyles !== undefined
            ? props.fileUploadStyles
            : { marginTop: "10px" }
        }
        type="file"
        onChange={(event) => props.onChange(event)}
      />
    </div>
  );
};

export default FileUpload;
