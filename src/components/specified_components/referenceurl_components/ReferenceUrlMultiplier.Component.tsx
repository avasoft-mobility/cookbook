import React from "react";

import Clickable from "../../wrapper_components/ButtonWrapperComponent";
import ReferenceUrlItem, { ReferenceURL } from "./ReferenceUrlItem.Component";

import Theme from "../../../configs/ThemeConfig";

interface ReferenceUrlMultiplierProps {
  referenceUrls: ReferenceURL[];
  onLinkChange: (id: string, value: string) => void;
  addNewReference: Function;
  deleteReferance: (id: string) => void;
}

const ReferenceUrlMultiplier: React.FC<ReferenceUrlMultiplierProps> = (
  props
) => {
  return (
    <>
      <div style={styles.referenceUrlItems as React.CSSProperties}>
        {props.referenceUrls.map((value) => {
          return (
            <ReferenceUrlItem
              key={value.id}
              onLinkChange={(id: string, value: string) =>
                props.onLinkChange(id, value)
              }
              deleteReferance={(id: string) => props.deleteReferance(id)}
              referenceUrl={value}
            />
          );
        })}
      </div>
      <div style={styles.addButtonContainer}>
        <Clickable
          ClickableText="ADD"
          onClick={() => props.addNewReference()}
          variant={"contained"}
          clickableSize={"small"}
          textColor={Theme.palette.text.primary}
        />
      </div>
    </>
  );
};

const styles = {
  referenceUrlItems: {
    display: "flex",
    flexDirection: "column",
  },
  addButtonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
};

export default ReferenceUrlMultiplier;
