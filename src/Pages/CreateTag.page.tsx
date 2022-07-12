import { useState } from "react";

import { useNavigate } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import { useMutation } from "react-query";

import Theme from "../configs/ThemeConfig";

import ApiService from "../services/ApiService";

import Clickable from "../components/wrapper_components/ButtonWrapperComponent";
import Input from "../components/wrapper_components/Input.WrapperComponent";
import Text from "../components/wrapper_components/Text.wrapperComponent";

interface TagPageData {
  tagName: string;
  errors: string;
}

const CreateTagPage = () => {
  const [tagData, setTagData] = useState<TagPageData>();
  const navigate = useNavigate();

  const mutation = useMutation(ApiService.addTag, {
    onSuccess: () => {
      navigate("/create/topic");
    },
  });

  const validateStackName = (value?: string) => {
    if (value === undefined) {
      setTagData({
        tagName: "",
        errors: "Tag name required",
      });
      return false;
    }

    if (value === "") {
      setTagData({
        tagName: "",
        errors: "Tag name required",
      });
      return false;
    }

    if (value!.length < 2) {
      setTagData({
        tagName: tagData!.tagName,
        errors: "Tag name length should be atleast 2 characters",
      });
      return false;
    }

    return true;
  };

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTagData({ tagName: event.target.value, errors: "" });
  };

  const onInputBlur = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateStackName(event.target.value);
  };

  const onAddButtonClicked = () => {
    if (validateStackName(tagData?.tagName)) {
      mutation.mutate(tagData!.tagName);
    }
  };

  const onAddNewTopicClicked = () => {
    navigate("/create/topic");
  };

  return (
    <div style={{ ...style.mainContainer, ...{ flexDirection: "column" } }}>
      <div style={style.headingContainer}>
        <Text variant={"h4"} color={Theme.palette.primary.main}>
          Create Tag
        </Text>
      </div>

      <div style={{ ...style.subContainer, ...{ flexDirection: "column" } }}>
        <div style={style.bodyContainer}>
          <Text variant={"body2"} color={""}>
            Enter tag name
          </Text>
          <div style={style.inputContainer}>
            <Input
              onChange={(event) => {
                onInputChange(event);
              }}
              onBlur={onInputBlur}
              inputTextStyle={{
                fontSize: "16px",
                padding: "12px 8px",
                color: Theme.palette.text.secondary,
              }}
            />
          </div>

          <Text variant={"inherit"} color={"#DB4437"}>
            {tagData?.errors}
          </Text>
        </div>

        <div style={style.buttonContainer}>
          {!mutation.isLoading ? (
            <>
              <div>
                <Clickable
                  ClickableText={"Add Tag"}
                  variant={"contained"}
                  clickableSize={"large"}
                  onClick={onAddButtonClicked}
                  style={style.addButton}
                />
              </div>
              <div>
                <Clickable
                  ClickableText={"ADD NEW TOPIC"}
                  variant={"text"}
                  textColor="black"
                  clickableSize={"large"}
                  onClick={onAddNewTopicClicked}
                  style={style.newTopicButton}
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
  newTopicButton: {
    width: "100%",
  },
};

export default CreateTagPage;
