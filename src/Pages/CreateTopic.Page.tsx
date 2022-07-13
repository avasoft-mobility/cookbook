import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { v4 as uuid } from "uuid";

import ApiService from "../services/ApiService";

import Clickable from "../components/wrapper_components/ButtonWrapperComponent";
import Icon from "../components/wrapper_components/Icon.WrapperComponent";
import IconButton from "../components/wrapper_components/IconButton.WrapperComponent";
import Input from "../components/wrapper_components/Input.WrapperComponent";
import MultipleSelectChip from "../components/wrapper_components/MultipleSelectChip.WrapperComponent";
import Text from "../components/wrapper_components/Text.wrapperComponent";

import Color from "../configs/ColorConfig";
import Theme from "../configs/ThemeConfig";
import useErrorSnackbar from "../hooks/useErrorSnackbar.hook";
import ErrorResponse from "../models/request_response_models/Error.Response.model";
import TopicCreateRequest from "../models/request_response_models/TopicCreate.request.model";

interface TopicErrors {
  name: boolean;
  tags: boolean;
  fileUpload: boolean;
}

const TopicPage = () => {
  const showErrorSnackBar = useErrorSnackbar();
  const navigate = useNavigate();
  const [references, setReferences] = useState([
    {
      id: uuid(),
      url: "",
    },
  ]);
  const [errors, setErrors] = useState<TopicErrors>({
    name: false,
    tags: false,
    fileUpload: false,
  });
  const [topic, setTopic] = useState<TopicCreateRequest>({
    name: "",
    flowchartUrl: "",
    tags: [],
    referenceUrls: [],
  });

  const tagsCall = useQuery("tags", () => ApiService.fetchTags());
  const topicCreateCall = useMutation(ApiService.addTopic, {
    onSuccess: () => {
      navigate("/create/cookbook");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

  const getTopic = (topicInput: string) => {
    const clonedTopic = { ...topic };
    clonedTopic.name = topicInput;

    setTopic(clonedTopic);
    validateName();
  };

  const onblurTopic = (topicInput: string) => {
    const clonedTopic = { ...topic };
    clonedTopic.name = topicInput;

    setTopic(clonedTopic);
    validateName();
  };

  const addNewReference = () => {
    setReferences([...references, { id: uuid(), url: "" }]);
  };

  const validateName = () => {
    const clonedErrors = { ...errors };

    if (topic.name === "") {
      clonedErrors.name = true;
    }
    if (topic.name !== "") {
      clonedErrors.name = false;
    }
    setErrors(clonedErrors);
  };

  const validateFileUpload = (url: string) => {
    const clonedErrors = { ...errors };

    if (url === "") {
      clonedErrors.fileUpload = true;
    }
    if (url !== "") {
      clonedErrors.fileUpload = false;
    }
    setErrors(clonedErrors);
  };

  const validateTags = (tags: string[]) => {
    const clonedErrors = { ...errors };

    if (tags.length === 0) {
      clonedErrors.tags = true;
    }
    if (tags.length !== 0) {
      clonedErrors.tags = false;
    }

    setErrors(clonedErrors);
  };

  const validate = () => {
    const clonedErrors = { ...errors };

    if (topic.name === "") {
      clonedErrors.name = true;
    }
    if (topic.name !== "") {
      clonedErrors.name = false;
    }
    if (topic.tags?.length === 0) {
      clonedErrors.tags = true;
    }
    if (topic.tags?.length !== 0) {
      clonedErrors.tags = false;
    }
    if (topic.flowchartUrl === "") {
      clonedErrors.fileUpload = true;
    }
    if (topic.flowchartUrl !== "") {
      clonedErrors.fileUpload = false;
    }

    setErrors(clonedErrors);

    if (clonedErrors.name || clonedErrors.tags || clonedErrors.fileUpload) {
      return true;
    }

    return false;
  };

  const onSave = () => {
    const referenceurl: string[] = references.map((reference) => {
      return reference.url;
    });
    const clonedTopic = { ...topic };
    clonedTopic.referenceUrls = referenceurl;
    if (!validate()) {
      topicCreateCall.mutate(clonedTopic);
    }
  };

  const createNewCookBook = () => {
    navigate(`/create/cookbook`);
  };

  const deleteReferance = (id: string) => {
    if (references.length === 1) {
      return;
    }
    const filteredReference = references.filter((ref) => {
      return ref.id !== id;
    });
    setReferences(filteredReference);
  };

  const onLinkChange = (id: string, value: string) => {
    const changedrefence = [...references];
    changedrefence.map((ref) => {
      return ref.id === id ? (ref.url = value) : ref.url;
    });
    setReferences(changedrefence);
  };

  const onTagChange = (values: string[]) => {
    const tagIds = values.map((tagName) => {
      const tag = tagsCall.data?.find((x) => x.name === tagName);
      return tag!._id;
    });

    const clonedTopic = { ...topic };
    clonedTopic.tags = tagIds;

    setTopic(clonedTopic);
    validateTags(tagIds);
  };

  const onTopicUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length === 0) {
      return;
    }
    const response = await ApiService.uploadFile(files!.item(0)!);

    const clonedTopic = { ...topic };
    clonedTopic.flowchartUrl = response.url;

    setTopic(clonedTopic);
    validateFileUpload(response.url);
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.innerContainer }}>
        <Text variant="h4" color={Theme.palette.primary.main}>
          Create Topic
        </Text>
      </div>
      <div
        style={{
          ...styles.innerContainer,
          ...{ flexDirection: "column", justifyContent: "space-between" },
        }}
      >
        <div>
          <div>
            <Text variant="body2" color={Theme.palette.text.secondary}>
              Name
            </Text>
            <div style={styles.topicInputContainer}>
              <Input
                onChange={(event) => {
                  getTopic(event.target.value);
                }}
                onBlur={(event) => {
                  onblurTopic(event.target.value);
                }}
                inputTextStyle={{
                  width: "100%",
                  fontSize: "16px",
                  padding: "12px 8px",
                  color: Theme.palette.text.secondary,
                }}
              />
            </div>
            <Text
              color={
                errors.name ? Color.errorMessage : Theme.palette.text.primary
              }
              variant="body2"
            >
              * Topic not to be empty
            </Text>
          </div>
          <div style={styles.inputsContainer}>
            <Text variant="body2" color={Theme.palette.text.secondary}>
              Tags
            </Text>
            <div style={{ ...styles.alignItemsCenter, ...styles.spaceBetween }}>
              <div style={styles.multipleSelectContainer}>
                <MultipleSelectChip
                  inputLabel="Tags"
                  values={tagsCall.data ? tagsCall.data.map((x) => x.name) : []}
                  chipStyle={{ color: Theme.palette.primary.main }}
                  menuItemStyle={{ color: Theme.palette.secondary.main }}
                  onChange={(event) =>
                    onTagChange(event.target.value as string[])
                  }
                />
              </div>
              <Clickable
                ClickableText={"Add Tag"}
                variant={"text"}
                clickableSize={"large"}
                onClick={(event) => {
                  navigate("/create/tag");
                }}
                textColor={Color.primaryColor}
                style={{ width: "150px", height: "50px" }}
              />
            </div>
            <Text
              color={
                errors.tags ? Color.errorMessage : Theme.palette.text.primary
              }
              variant="body2"
            >
              * Topic must have tags
            </Text>
          </div>
          <div style={styles.inputsContainer}>
            <Text variant="body2" color={Theme.palette.text.secondary}>
              Topic Flow Diagram
            </Text>
            <input
              style={styles.inputImage}
              type={"file"}
              onChange={onTopicUpload}
            />
            <Text
              color={
                errors.fileUpload
                  ? Color.errorMessage
                  : Theme.palette.text.primary
              }
              variant="body2"
            >
              * Topic need flow diagram
            </Text>
          </div>
          <div style={{ display: "flex", flex: 1, width: "100%" }}>
            <div style={styles.inputsContainer}>
              <Text variant="body2" color={Theme.palette.text.secondary}>
                Reference
              </Text>
              <div
                style={{ display: "flex", flex: 1, flexDirection: "column" }}
              >
                {references.map((value) => {
                  return (
                    <div
                      key={value.id}
                      style={{
                        ...styles.refarenceContainer,
                        ...{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        },
                      }}
                    >
                      <div
                        style={{
                          ...styles.topicInputContainer,
                          ...{ marginRight: "20px" },
                        }}
                      >
                        <Input
                          onChange={(event) => {
                            onLinkChange(value.id, event.target.value);
                          }}
                          value={value.url}
                          inputTextStyle={{
                            width: "100%",
                            fontSize: "16px",
                            padding: "12px 8px",
                            color: Theme.palette.text.secondary,
                          }}
                        />
                      </div>
                      <IconButton
                        color={"primary"}
                        onClick={() => {
                          deleteReferance(value.id);
                        }}
                      >
                        <Icon type={"delete"} />
                      </IconButton>
                    </div>
                  );
                })}
              </div>
              <div style={styles.addButtonContainer}>
                <Clickable
                  ClickableText="ADD"
                  onClick={addNewReference}
                  variant={"contained"}
                  clickableSize={"small"}
                  textColor={Theme.palette.text.primary}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ ...styles.buttonsContainer, ...{ flexDirection: "column" } }}
        >
          <Clickable
            ClickableText="Save"
            onClick={onSave}
            variant={"contained"}
            clickableSize={"large"}
            textColor={Theme.palette.text.primary}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <Clickable
            ClickableText="Add New CookBook"
            onClick={createNewCookBook}
            variant={"text"}
            clickableSize={"large"}
            textColor={Color.lightTextSecondaryColor}
            style={{ width: "100%", fontWeight: "400" }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100vh",
  },
  innerContainer: {
    display: "flex",
    flex: 1,
    padding: "30px 20%",
  },
  inputsContainer: {
    width: "100%",
    marginTop: "10px",
  },
  topicInputContainer: {
    display: "flex",
    flex: 1,
    border: "1px solid ",
    borderColor: Theme.palette.primary.main,
    padding: "5px",
    marginTop: "8px",
    borderRadius: "10px",
  },
  addButtonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: "40px",
    display: "flex",
  },
  refarenceContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    marginTop: "10px",
  },
  inputImage: {
    marginTop: "10px",
  },
  alignItemsCenter: {
    display: "flex",
    alignItems: "center",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  multipleSelectContainer: {
    width: "100%",
    marginRight: "20px",
  },
  flexDirectionColumn: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
};

export default TopicPage;
