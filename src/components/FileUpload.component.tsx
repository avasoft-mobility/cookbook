import React from "react";
import Color from "../configs/ColorConfig";
import Text from "./wrapper_components/Text.wrapperComponent";
interface FileUploadProps {
  label: string;
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
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  fileInputStyle?: React.CSSProperties;
  errorMessage?: string;
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
        {props.label}
      </Text>
      <input
        style={
          props.fileInputStyle !== undefined
            ? props.fileInputStyle
            : styles.fileInput
        }
        type="file"
        onChange={props.onChange}
      />
      <div style={styles.errorTextContainer}>
        <Text variant={"body2"} color={Color.errorMessage}>
          {props.errorMessage}
        </Text>
      </div>
    </div>
  );
};

const styles = {
  errorTextContainer: {
    marginTop: "5px",
  },
  fileInput: {
    marginTop: "10px",
  },
};

export default FileUpload;
