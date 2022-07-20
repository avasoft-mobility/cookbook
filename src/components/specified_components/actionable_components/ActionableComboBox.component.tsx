import React from "react";

import Color from "../../../configs/ColorConfig";
import theme from "../../../configs/ThemeConfig";

import Clickable from "../../wrapper_components/ButtonWrapperComponent";
import ComboBox from "../../wrapper_components/ComboBox.WrapperComponent";
import Text from "../../wrapper_components/Text.wrapperComponent";

interface ActionableComboBoxProps {
  title: string;
  label: string;
  options: string[];
  clickableText: string;
  onChanged: Function;
  onClickableClick: React.MouseEventHandler<HTMLButtonElement>;
  defaultValue?: string;
}

const ActionableComboBox: React.FC<ActionableComboBoxProps> = ({
  title,
  label,
  options,
  onChanged,
  clickableText,
  onClickableClick,
  defaultValue,
}) => {
  return (
    <div>
      <div style={styles.title}>
        <Text variant="body1" color={theme.palette.text.secondary}>
          {title}
        </Text>
      </div>
      <div style={styles.spaceBetween}>
        <ComboBox
          label={label}
          onChanged={onChanged}
          options={options}
          defaultValue={defaultValue}
        />
        <div style={styles.buttonConatiner}>
          <Clickable
            ClickableText={clickableText}
            variant={"text"}
            clickableSize={"large"}
            onClick={onClickableClick}
            textColor={Color.primaryColor}
            style={styles.clickableStyles}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  buttonConatiner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: "8px",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  clickableStyles: {
    width: "150px",
    height: "50px",
  },
  title: {
    marginTop: "15px",
    marginBottom: "10px",
  },
};

export default ActionableComboBox;
