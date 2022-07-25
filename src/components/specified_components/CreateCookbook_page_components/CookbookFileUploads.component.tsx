import React, { ChangeEventHandler } from "react";
import FileUpload from "../../wrapper_components/FileUpload.component";
import Theme from "../../../configs/ThemeConfig";

interface CookbookFileUploadsProps {
  onTechnicalFlowUpload: ChangeEventHandler<HTMLInputElement>;
  onSampleProjectUpload: ChangeEventHandler<HTMLInputElement>;
}

const CookbookFileUploads: React.FC<CookbookFileUploadsProps> = (props) => {
  return (
    <div>
      <div style={styles.fileUploadContainer}>
        <FileUpload
          onChange={props.onTechnicalFlowUpload}
          label={"Upload Technical Flow"}
          textColor={Theme.palette.text.secondary}
        />
      </div>
      <div style={styles.fileUploadContainer}>
        <FileUpload
          onChange={props.onSampleProjectUpload}
          label={"Upload Sample Code (in compressed format)"}
          textColor={Theme.palette.text.secondary}
        />
      </div>
    </div>
  );
};

const styles = {
  fileUploadContainer: {
    margin: "30px 0px",
  },
};

export default CookbookFileUploads;
