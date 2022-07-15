import { useState } from "react";

import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";

import Theme from "../../configs/ThemeConfig";

import ApiService from "../../services/ApiService";

import Clickable from "../../components/wrapper_components/ButtonWrapperComponent";
import Input from "../../components/wrapper_components/Input.WrapperComponent";
import Text from "../../components/wrapper_components/Text.wrapperComponent";
import Color from "../../configs/ColorConfig";
import ErrorResponse from "../../models/request_response_models/Error.Response.model";
import useErrorSnackbar from "../../hooks/useErrorSnackbar.hook";

interface StackPageData {
  stackName: string;
  errors: string;
}

const Stackpage = () => {
  const showErrorSnackBar = useErrorSnackbar();
  const [stackData, setStackData] = useState<StackPageData>();
  const navigate = useNavigate();

  const mutation = useMutation(ApiService.addStack, {
    onSuccess: () => {
      navigate("/create/cookbook");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

  const validateStackName = (value?: string) => {
    if (value === undefined) {
      setStackData({
        stackName: "",
        errors: "Stack name required",
      });
      return false;
    }

    if (value === "") {
      setStackData({
        stackName: "",
        errors: "Stack name required",
      });
      return false;
    }

    if (value!.length < 2) {
      setStackData({
        stackName: stackData!.stackName,
        errors: "Stack name length should be atleast 2 characters",
      });
      return false;
    }

    return true;
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStackData({ stackName: event.target.value, errors: "" });
  };

  const onInputBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateStackName(event.target.value);
  };

  const onAddButtonClicked = () => {
    if (validateStackName(stackData?.stackName)) {
      mutation.mutate(stackData!.stackName);
    }
  };

  const onAddNewCookbookClicked = () => {
    navigate("/create/cookbook");
  };

  return (
    <div style={{ ...style.mainContainer, ...{ flexDirection: "column" } }}>
      <div style={style.headingContainer}>
        <Text variant={"h4"} color={Theme.palette.primary.main}>
          Create Stack
        </Text>
      </div>

      <div style={{ ...style.subContainer, ...{ flexDirection: "column" } }}>
        <div style={style.bodyContainer}>
          <Text variant={"body2"} color={""}>
            Stack Name
          </Text>
          <div>
            <Input
              onChange={(event) => {
                onInputChange(event);
              }}
              onBlur={onInputBlur}
              type={"outlined"}
              placeHolderText="Enter the Stack Name"
              style={{ marginTop: "10px" }}
              errorText={stackData?.errors ? stackData.errors : ""}
            />
          </div>
        </div>

        <div style={style.buttonContainer}>
          {!mutation.isLoading ? (
            <>
              <div>
                <Clickable
                  ClickableText={"Add Stack"}
                  variant={"contained"}
                  clickableSize={"large"}
                  onClick={onAddButtonClicked}
                  style={style.addButton}
                />
              </div>
              <div>
                <Clickable
                  ClickableText={"ADD NEW COOKBOOK"}
                  variant={"text"}
                  textColor={Color.lightTextSecondaryColor}
                  clickableSize={"large"}
                  onClick={onAddNewCookbookClicked}
                  style={style.cookbookButton}
                />
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const style = {
  mainContainer: {
    display: "flex",
    flex: 1,
    padding: "30px 20%",
    height: "100vh",
    justifyContent: "space-between",
  },
  headingContainer: {
    flex: 1,
  },
  subContainer: {
    display: "flex",
    flex: 7,
    justifyContent: "space-between",
  },
  bodyContainer: {
    flex: 2,
  },
  inputContainer: {
    border: "1px solid #6133BD",
    width: "100%",
    marginBottom: "30px",
    marginTop: "10px",
    paddingLeft: "10px",
    borderRadius: "10px",
  },
  buttonContainer: {
    flex: 4,
    marginBottom: "40px",
  },
  addButton: {
    width: "100%",
    marginBottom: "20px",
  },
  cookbookButton: {
    width: "100%",
    fontWeight: "400",
  },
};

export default Stackpage;
