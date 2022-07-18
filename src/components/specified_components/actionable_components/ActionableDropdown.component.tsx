import React from "react";

import Color from "../../../configs/ColorConfig";

import Button from "../../wrapper_components/Button.WrapperComponent";
import ConfirmationDialog from "../../wrapper_components/ConfirmationDialog.WrapperComponent";

interface ActionableDropdownProps {
  dialogTitle: string;
  dialogHeader: string;
  dialogValues: string[];
  confirmationDialogvalue: string;
  onConfirm: Function;
  clickableText: string;
  onClickableClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ActionableDropdown: React.FC<ActionableDropdownProps> = ({
  dialogTitle,
  dialogHeader,
  dialogValues,
  confirmationDialogvalue,
  onConfirm,
  clickableText,
  onClickableClick,
}) => {
  return (
    <div>
      <div style={styles.spaceBetween}>
        <ConfirmationDialog
          title={dialogTitle}
          dialogHeader={dialogHeader}
          dialogValues={dialogValues}
          value={confirmationDialogvalue}
          onConfirm={onConfirm}
        />
        <div style={styles.buttonConatiner}>
          <Button
            buttonText={clickableText}
            variant={"text"}
            buttonSize={"large"}
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
};

export default ActionableDropdown;
