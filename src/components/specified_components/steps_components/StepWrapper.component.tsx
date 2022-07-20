import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Theme from "../../../configs/ThemeConfig";
import StepValue from "../../../models/StepValue.model";
import ApiService from "../../../services/ApiService";
import Clickable from "../../wrapper_components/ButtonWrapperComponent";
import Step from "./Step.Component";

interface StepWrapperProps {
  onValueChange: Function;
  onDelete: Function;
  onAddNew: Function;
  initialValues?: StepValue[];
}

const StepWrapper: React.FC<StepWrapperProps> = (props) => {
  const [stepValue, setStepValue] = useState<StepValue[]>(
    props.initialValues !== undefined
      ? props.initialValues
      : [
          {
            id: uuidv4(),
            title: "",
            description: "",
            code: "",
            image: "",
          },
        ]
  );

  const onValueChange = (value: StepValue, index: number, imageUrl: string) => {
    let newStep = [...stepValue];
    let currentStepElement = newStep[index];
    currentStepElement.title = value.title;
    currentStepElement.description = value.description;
    currentStepElement.code = value.code;
    currentStepElement.image = imageUrl;
    newStep[index] = currentStepElement;

    setStepValue(newStep);
    props.onValueChange(newStep);
  };
  const handleFileUpload = async (event: any, values: any, index: number) => {
    if (event.target.files.length === 0) {
      return;
    }

    const result = await ApiService.uploadFile(event.target.files[0]);
    onValueChange(values, index, result.url);
  };
  const handleAddNew = () => {
    const newStep: StepValue = {
      id: uuidv4(),
      title: "",
      description: "",
      code: "",
      image: "",
    };
    setStepValue([...stepValue, newStep]);
    props.onAddNew(stepValue);
  };
  const handleDelete = (id: string) => {
    if (stepValue.length === 1) {
      return;
    }
    const currentStep = stepValue.filter((value) => value.id !== id);
    setStepValue(currentStep);
    props.onDelete(stepValue);
  };
  return (
    <div>
      {stepValue.map((value, index: number) => (
        <div
          key={value.id}
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "20px",
            backgroundColor: "rgb(240 240 240 / 37%)",
            padding: "10px",
            borderRadius: "20px",
          }}
        >
          <div style={{ width: "100%" }}>
            <Step
              key={index}
              values={value}
              onValueChange={onValueChange}
              currentIndex={index}
              handleFileUpload={handleFileUpload}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
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
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Clickable
          ClickableText={"Add new Step"}
          variant={"contained"}
          clickableSize={"medium"}
          onClick={handleAddNew}
        />
      </div>
    </div>
  );
};

export default StepWrapper;
