import React from "react";
import { useFormik } from "formik";
import Text from "../../wrapper_components/Text.wrapperComponent";
import Theme from "../../../configs/ThemeConfig";
import StepValue from "../../../models/StepValue.model";
import ApiService from "../../../services/ApiService";
import Color from "../../../configs/ColorConfig";
import FileUpload from "../../wrapper_components/FileUpload.component";

interface StepProps {
  values: StepValue;
  onValueChange: Function;
  currentIndex: number;
}

const Step: React.FC<StepProps> = (props) => {
  const changeHandler = async (event: any) => {
    const result = await ApiService.uploadFile(event.target.files[0]);
    formik.values.image = result.url;
    props.onValueChange(formik.values, props.currentIndex);
  };

  const formik = useFormik({
    initialValues: {
      title: props.values.title,
      description: props.values.description,
      code: props.values.code,
      image: props.values.image,
    },
    validate: (values) => {
      let errors: any = {};

      if (!values.title) {
        errors.title = "Required";
      }

      if (values.title.length < 10) {
        errors.title = "Must be 10 characters or more";
      }

      if (!values.description) {
        errors.description = "Required";
      }

      if (values.description.length < 20) {
        errors.description = "Must be 20 characters or more";
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
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      <form>
        <div style={{ paddingTop: "10px" }}>
          <Text variant={"body2"} color={Theme.palette.text.secondary}>
            Title
          </Text>
          <input
            style={styles.inputStyle}
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
          <Text variant={"body2"} color={Theme.palette.text.secondary}>
            Description
          </Text>
          <textarea
            style={styles.inputStyle}
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
          <Text variant={"body2"} color={Theme.palette.text.secondary}>
            Code
          </Text>
          <textarea
            style={styles.inputStyle}
            name="code"
            onChange={onVisualChange}
            placeholder="code"
            rows={10}
            value={formik.values.code}
            onBlur={onVisualChange}
          />
        </div>
        <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
          <FileUpload
            onChange={changeHandler}
            label={"Upload File"}
            textColor={Theme.palette.text.secondary}
          />
        </div>
      </form>
    </div>
  );
};

const styles = {
  inputStyle: {
    marginTop: "8px",
    border: "1px solid rgb(195 195 195)",
    width: "100%",
    fontSize: "16px",
    padding: "10px 8px",
    borderRadius: "8px",
  },
};

export default Step;
