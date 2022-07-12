import { IconButton } from "@mui/material";
import React, { useState } from "react";
import Step from "./Step.Component";
import DeleteIcon from "@mui/icons-material/Delete";
import Theme from "../configs/ThemeConfig";
import Clickable from "./wrapper_components/ButtonWrapperComponent";
import StepValue from "../models/StepValue.model";
import { v4 as uuidv4 } from "uuid";

interface StepWrapperProps {
  onValueChange:Function;
  onDelete:Function;
  onAddNew:Function;

}

const StepWrapper: React.FC<StepWrapperProps> = (props) => {
  const [stepValue, setStepValue] = useState<StepValue[]>([
    {
      id: uuidv4(),
      title: "",
      description: "",
      code: "",
      fileUpload: "",
    },
  ]);
  const onValueChange = (value: StepValue, index: number) => {
    let newStep = [...stepValue];
    let currentStepElement = newStep[index];
    currentStepElement.title = value.title;
    currentStepElement.description = value.description;
    currentStepElement.code = value.code;
    currentStepElement.fileUpload = value.fileUpload;
    newStep[index] = currentStepElement;
    setStepValue(newStep);
    props.onValueChange(stepValue)
  };
  const handleAddNew = () => {
    const newStep: StepValue = {
      id: uuidv4(),
      title: "",
      description: "",
      code: "",
      fileUpload: "",
    };
    setStepValue([...stepValue, newStep]);
    props.onAddNew(stepValue)
  };
  const handleDelete = (id: string) => {
    if (stepValue.length === 1) {
      return;
    }
    const currentStep = stepValue.filter((value) => value.id !== id);
    setStepValue(currentStep);
    props.onDelete(stepValue)
  };
  return (
    <div style={{ marginLeft: "100px", marginRight: "100px" }}>
      {stepValue.map((value, index: number) => (
        <div
          key={value.id}
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
          }}
        >
          <div style={{ width: "100%" }}>
            <Step
              key={index}
              values={value}
              onValueChange={onValueChange}
              currentIndex={index}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              aria-label="delete"
              sx={{ color: Theme.palette.primary.main }}
              onClick={() => handleDelete(value.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        <Clickable
          ClickableText={"Add new"}
          variant={"contained"}
          clickableSize={"large"}
          onClick={handleAddNew}
        />
      </div>
    </div>
  );
};

export default StepWrapper;