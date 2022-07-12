import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import Text from "./wrapper_components/Text.wrapperComponent";
import Theme from "../configs/ThemeConfig";
import StepValue from "../models/StepValue.model";
import ApiService from "../services/ApiService";
import Color from "../configs/ColorConfig";

interface StepProps {
  values: StepValue;
  onValueChange: Function;
  currentIndex: number;
}

const Step: React.FC<StepProps> = (props) => {
  const [selectedFile, setSelectedFile] = useState("");
  const fileInputRef = useRef();
  const handleFileUpload = (event: any) => {};

  const changeHandler = async (event: any) => {
    const result = await ApiService.uploadFile(event.target.files[0]);
    formik.values.fileUpload = result.url;
    props.onValueChange(formik.values, props.currentIndex);
  };
  const formik = useFormik({
    initialValues: {
      title: props.values.title,
      description: props.values.description,
      code: props.values.code,
      fileUpload: props.values.fileUpload,
    },
    validate: (values) => {
      let errors: any = {};
      if (!values.title) {
        errors.title = "Required";
      } else if (values.title.length > 10) {
        errors.title = "Must be 10 characters or less";
      }
      if (!values.description) {
        errors.description = "Required";
      } else if (values.description.length > 20) {
        errors.description = "Must be 20 characters or less";
      }
      return errors;
    },
    onSubmit: (_) => {},
  });

  const onVisualChange = (event: any) => {
    formik.handleChange(event);
    props.onValueChange(formik.values, props.currentIndex);
  };

  return (
    <div>
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        <form>
          <div style={{ paddingTop: "10px" }}>
            <Text variant={"h5"} color={Theme.palette.text.secondary}>
              Title
            </Text>
            <input
              style={{
                border: "1px solid #1A1110",
                width: "100%",
                height: "50px",
                fontSize: "20px",
              }}
              name="title"
              onChange={onVisualChange}
              placeholder="Title"
              value={formik.values.title}
              onBlur={onVisualChange}
            />
            {formik.errors.title && formik.touched ? (
              <Text variant={"body2"} color={Color.errorMessage}>
                {formik.errors.title}
              </Text>
            ) : null}
          </div>
          <div style={{ paddingTop: "10px" }}>
            <Text variant={"h5"} color={Theme.palette.text.secondary}>
              Description
            </Text>
            <textarea
              style={{
                border: "1px solid #1A1110",
                width: "100%",
                height: "50px",
                fontSize: "20px",
              }}
              name="description"
              onChange={onVisualChange}
              placeholder="description"
              value={formik.values.description}
              onBlur={onVisualChange}
            />
            {formik.errors.description && formik.touched ? (
              <Text variant={"body2"} color={Color.errorMessage}>
                {formik.errors.description}
              </Text>
            ) : null}
          </div>
          <div style={{ paddingTop: "10px" }}>
            <Text variant={"h5"} color={Theme.palette.text.secondary}>
              Code
            </Text>
            <textarea
              style={{
                border: "1px solid #1A1110",
                width: "100%",
                height: "50px",
                fontSize: "20px",
              }}
              name="code"
              onChange={onVisualChange}
              placeholder="code"
              value={formik.values.code}
              onBlur={onVisualChange}
            />
          </div>
          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            <Text variant={"h5"} color={Theme.palette.text.secondary}>
              Upload File
            </Text>
            <input
              style={{ marginTop: "10px" }}
              type="file"
              name="file"
              onChange={changeHandler}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Step;
