import React from "react";
import { Formik } from "formik";
import Text from "../../wrapper_components/Text.wrapperComponent";
import Theme from "../../../configs/ThemeConfig";
import StepValue from "../../../models/StepValue.model";
import FormikInput from "../Formik_components/FormikInput.Component";

interface StepProps {
  values: StepValue;
  onValueChange: Function;
  currentIndex: number;
  handleFileUpload: Function;
}

const Step: React.FC<StepProps> = (props) => {
  return (
    <div>
      <div style={{ marginLeft: "10px", marginRight: "10px" }}>
        <Formik
          initialValues={{
            title: props.values.title,
            description: props.values.description,
            code: props.values.code,
            image: props.values.image,
          }}
          validate={(values) => {
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
          }}
          onSubmit={(values) => {}}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form>
              <div style={{ paddingTop: "10px" }}>
                <Text variant={"body2"} color={Theme.palette.text.secondary}>
                  Title
                </Text>
                <FormikInput
                  name={"title"}
                  onChange={(event) => {
                    handleChange("title");
                    props.onValueChange(values, props.currentIndex);
                  }}
                  onBlur={handleBlur("title")}
                  type="outlined"
                  errorText={errors.title && touched.title ? errors.title : ""}
                  placeHolderText="Enter the Title"
                  style={{ marginTop: "10px" }}
                />
              </div>
              <div style={{ paddingTop: "10px" }}>
                <Text variant={"body2"} color={Theme.palette.text.secondary}>
                  Description
                </Text>
                <FormikInput
                  name={"description"}
                  onChange={(event) => {
                    handleChange("description");
                    props.onValueChange(values, props.currentIndex);
                  }}
                  onBlur={handleBlur("description")}
                  type="outlined"
                  errorText={
                    errors.description && touched.description
                      ? errors.description
                      : ""
                  }
                  placeHolderText="Enter the Description"
                  style={{ marginTop: "10px" }}
                  numberOfLines={5}
                />
              </div>
              <div style={{ paddingTop: "10px" }}>
                <Text variant={"body2"} color={Theme.palette.text.secondary}>
                  Code
                </Text>
                <FormikInput
                  name={"code"}
                  onChange={(event) => {
                    handleChange("code");
                    props.onValueChange(values, props.currentIndex);
                  }}
                  onBlur={handleBlur("code")}
                  type="outlined"
                  placeHolderText="Enter the code"
                  style={{ marginTop: "10px" }}
                  errorText=""
                  numberOfLines={5}
                />
              </div>
              <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <Text variant={"body2"} color={Theme.palette.text.secondary}>
                  Upload File
                </Text>
                <input
                  style={{ marginTop: "10px" }}
                  type="file"
                  name="file"
                  onChange={(event) => {
                    props.handleFileUpload(event, values, props.currentIndex);
                  }}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
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
