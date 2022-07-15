import React from "react";
import Color from "../../configs/ColorConfig";
import Text from "./Text.wrapperComponent";
interface FileUploadProps {
  label: string;
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
        variant={"body2"}
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
      {props.errorMessage !== undefined || "" || null ? (
        <div style={styles.errorTextContainer}>
          <Text variant={"body2"} color={Color.errorMessage}>
            {props.errorMessage}
          </Text>
        </div>
      ) : null}
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
