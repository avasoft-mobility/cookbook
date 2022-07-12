import { useState } from "react";

import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import { useMutation } from "react-query";

import Theme from "../configs/ThemeConfig";

import ApiService from "../services/ApiService";

import Clickable from "../components/wrapper_components/ButtonWrapperComponent";
import Input from "../components/wrapper_components/Input.WrapperComponent";
import Text from "../components/wrapper_components/Text.wrapperComponent";

interface StackPageData {
  stackName: string;
  errors: string;
}

const Stackpage = () => {
  const [stackData, setStackData] = useState<StackPageData>();
  const navigate = useNavigate();

  const mutation = useMutation(ApiService.addStack, {
    onSuccess: () => {
      navigate("/create/cookbook");
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
          Add new stack
        </Text>
      </div>

      <div style={{ ...style.subContainer, ...{ flexDirection: "column" } }}>
        <div style={style.bodyContainer}>
          <Text variant={"inherit"} color={""}>
            Stack Name
          </Text>
          <div style={style.inputContainer}>
            <Input
              onChange={(event) => {
                onInputChange(event);
              }}
              onBlur={onInputBlur}
            />
          </div>

          <Text variant={"inherit"} color={"#DB4437"}>
            {stackData?.errors}
          </Text>
        </div>

        <div style={style.buttonContainer}>
          {!mutation.isLoading ? (
            <>
              <div>
                <Clickable
                  ClickableText={"ADD"}
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
                  textColor="black"
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
    marginLeft: "35%",
    marginRight: "35%",
    height: "100vh",
    justifyContent: "space-between",
  },
  headingContainer: {
    flex: 1,
    marginTop: "40px",
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
  },
};

export default Stackpage;
