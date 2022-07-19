import { useState } from "react";
import { AxiosError } from "axios";

import { useNavigate, useParams } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

import { useMutation, useQuery } from "react-query";

import Theme from "../../configs/ThemeConfig";

import ApiService from "../../services/ApiService";

import Clickable from "../../components/wrapper_components/ButtonWrapperComponent";
import Input from "../../components/wrapper_components/Input.WrapperComponent";
import Text from "../../components/wrapper_components/Text.wrapperComponent";
import Color from "../../configs/ColorConfig";

import useErrorSnackbar from "../../hooks/useErrorSnackbar.hook";
import ErrorResponse from "../../models/request_response_models/Error.Response.model";
import Title from "../../components/specified_components/text_components/Title.component";
import Tag from "../../models/Tag.Model";

interface TagPageData {
  tagName: string;
  errors: string;
}

const CreateTagPage = () => {
  const showErrorSnackBar = useErrorSnackbar();

  const [tagData, setTagData] = useState<TagPageData>();
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data } = useQuery(
    ["tag", id],
    () => {
      if (id !== undefined) {
        return ApiService.fetchTag(id);
      }
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        onSuccessfetchTag(response!);
      },
      onError: (error: AxiosError) => {
        showErrorSnackBar((error.response?.data as ErrorResponse).message);
      },
    }
  );

  const onSuccessfetchTag = (response: Tag) => {
    const newtagData: TagPageData = {
      tagName: response.name,
      errors: "",
    };
    setTagData(newtagData);
  };

  const createMutation = useMutation(ApiService.addTag, {
    onSuccess: () => {
      navigate("/create/topic");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

  const updateMutation = useMutation(ApiService.updateTag, {
    onSuccess: () => {
      navigate("/create/topic");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
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
      createMutation.mutate(tagData!.tagName);
    }
  };
  const onUpdateButtonClicked = () => {
    if (tagData !== undefined && id !== undefined) {
      const newTag: Tag = {
        name: tagData.tagName,
        topics: [],
        _id: id,
      };
      if (validateStackName(tagData.tagName)) {
        updateMutation.mutate(newTag);
      }
    }
  };

  const onAddNewTopicClicked = () => {
    navigate("/create/topic");
  };

  return (
    <div style={{ ...style.mainContainer, ...{ flexDirection: "column" } }}>
      <Title text="Create Tag" />

      <div style={{ ...style.subContainer, ...{ flexDirection: "column" } }}>
        <div style={style.bodyContainer}>
          <Text variant={"body2"} color={""}>
            Tag
          </Text>
          <div>
            <Input
              onChange={(event) => {
                onInputChange(event);
              }}
              onBlur={onInputBlur}
              type={"outlined"}
              placeHolderText="Enter the Tag Name"
              style={{ marginTop: "10px" }}
              errorText={tagData?.errors ? tagData.errors : ""}
              value={
                tagData?.tagName !== undefined ? tagData?.tagName : undefined
              }
            />
          </div>
        </div>

        <div style={style.buttonContainer}>
          {!createMutation.isLoading || updateMutation.isLoading ? (
            <>
              <div>
                <Clickable
                  ClickableText={id !== undefined ? "Update Tag" : "Add Tag"}
                  variant={"contained"}
                  clickableSize={"large"}
                  onClick={
                    id !== undefined
                      ? onUpdateButtonClicked
                      : onAddButtonClicked
                  }
                  style={style.addButton}
                />
              </div>
              <div>
                <Clickable
                  ClickableText={"ADD NEW TOPIC"}
                  variant={"text"}
                  textColor={Color.lightTextSecondaryColor}
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
    fontWeight: "400",
  },
};

export default CreateTagPage;
