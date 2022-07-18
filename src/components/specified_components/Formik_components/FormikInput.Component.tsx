import React from "react";

import { Field, FieldProps } from "formik";

import Input, {
  InputProps,
} from "../../wrapper_components/Input.WrapperComponent";

interface FormikInputProps extends InputProps {
  name: string;
  error?: string;
  touched?: boolean;
}

const FormikInput: React.FC<FormikInputProps> = (props) => {
  return (
    <Field name={props.name}>
      {({
        field: { value, onChange, onBlur },
        form: { setFieldValue },
      }: FieldProps<any>) => (
        <Input
          value={value}
          onChange={(event) => {
            setFieldValue(props.name, event.target.value, true);
            onChange(event);
            if (props.onChange) {
              props.onChange(event);
            }
          }}
          onBlur={(event) => {
            setFieldValue(props.name, event.target.value, true);
            onBlur(event);
            if (props.onBlur) {
              props.onBlur(event);
            }
          }}
          type={props.type}
          errorText={props.errorText}
          placeHolderText={props.placeHolderText}
          style={props.style}
          numberOfLines={props.numberOfLines}
        />
      )}
    </Field>
  );
};
export default FormikInput;
