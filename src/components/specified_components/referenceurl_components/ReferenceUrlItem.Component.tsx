import React from "react";
import Icon from "../../wrapper_components/Icon.WrapperComponent";
import IconButton from "../../wrapper_components/IconButton.WrapperComponent";
import Input from "../../wrapper_components/Input.WrapperComponent";

interface ReferenceURL {
  id: string;
  url: string;
}

interface ReferenceUrlItemProps {
  referenceUrl: ReferenceURL;
  onLinkChange: (id: string, url: string) => void;
  deleteReferance: (id: string) => void;
}

const ReferenceUrlItem: React.FC<ReferenceUrlItemProps> = (props) => {
  return (
    <div style={styles.referenceContainer as React.CSSProperties}>
      <div style={styles.referenceUrlInput}>
        <Input
          onChange={(event: { target: { value: string } }) => {
            props.onLinkChange(props.referenceUrl.id, event.target.value);
          }}
          value={props.referenceUrl.url}
          type={"outlined"}
          placeHolderText="Enter the Reference"
          style={{ marginTop: "10px" }}
          errorText=""
        />
      </div>
      <IconButton
        color={"primary"}
        onClick={() => {
          props.deleteReferance(props.referenceUrl.id);
        }}
      >
        <Icon type={"delete"} />
      </IconButton>
    </div>
  );
};

const styles = {
  referenceContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  referenceUrlInput: {
    marginRight: "20px",
    width: "100%",
  },
};

export type { ReferenceURL };

export default ReferenceUrlItem;
