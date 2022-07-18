import React from "react";

import Text from "../..//wrapper_components/Text.wrapperComponent";
import Button from "../../wrapper_components/Button.WrapperComponent";
import MultipleSelectChip from "../../wrapper_components/MultipleSelectChip.WrapperComponent";

import Color from "../../../configs/ColorConfig";
import Theme from "../../../configs/ThemeConfig";

interface ActionableMultiSelectChipProps {
  tags: string[];
  onTagChange: Function;
  createNewTag: Function;
  title: string;
  errorMessage?: string;
}

const ActionableMultiSelectChip: React.FC<ActionableMultiSelectChipProps> = (
  props
) => {
  return (
    <div>
      <Text variant="body2" color={Theme.palette.text.secondary}>
        {props.title}
      </Text>
      <div style={styles.alignItemsCenter as React.CSSProperties}>
        <div style={styles.multipleSelectContainer}>
          <MultipleSelectChip
            inputLabel="Tags"
            values={props.tags}
            chipStyle={{ color: Theme.palette.primary.main }}
            menuItemStyle={{ color: Theme.palette.secondary.main }}
            onChange={(event) =>
              props.onTagChange(event.target.value as string[])
            }
          />
        </div>
        <Button
          buttonText={"Add Tag"}
          variant={"text"}
          buttonSize={"large"}
          onClick={() => props.createNewTag()}
          textColor={Color.primaryColor}
          style={styles.addButton}
        />
      </div>
      {props.errorMessage !== undefined && props.errorMessage !== "" ? (
        <Text color={Color.errorMessage} variant="body2">
          {props.errorMessage}
        </Text>
      ) : null}
    </div>
  );
};

const styles = {
  alignItemsCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  multipleSelectContainer: {
    width: "100%",
    marginRight: "20px",
  },
  addButton: {
    width: "150px",
    height: "50px",
  },
};

export default ActionableMultiSelectChip;
