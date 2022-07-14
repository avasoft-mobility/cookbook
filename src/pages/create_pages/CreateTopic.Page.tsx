import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { v4 as uuid } from "uuid";

import ApiService from "../services/ApiService";

import Button from "../components/wrapper_components/Button.WrapperComponent";
import Icon from "../components/wrapper_components/Icon.WrapperComponent";
import IconButton from "../components/wrapper_components/IconButton.WrapperComponent";
import Input from "../components/wrapper_components/Input.WrapperComponent";
import MultipleSelectChip from "../components/wrapper_components/MultipleSelectChip.WrapperComponent";
import Text from "../components/wrapper_components/Text.wrapperComponent";

import Color from "../configs/ColorConfig";
import Theme from "../configs/ThemeConfig";
import useErrorSnackbar from "../hooks/useErrorSnackbar.hook";
import useTabRouter from "../hooks/useTabRouter.hook";
import ErrorResponse from "../models/request_response_models/Error.Response.model";
import TopicCreateRequest from "../models/request_response_models/TopicCreate.request.model";
import useExitPrompt from "../hooks/useExitPrompt";

interface TopicErrors {
  name: boolean;
  tags: boolean;
  fileUpload: boolean;
}

const TopicPage = () => {
  const showErrorSnackBar = useErrorSnackbar();
  const navigate = useNavigate();
  const tabRouter = useTabRouter();
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);

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

  const emptyTopic: TopicCreateRequest = {
    name: "",
    flowchartUrl: "",
    tags: [],
    referenceUrls: [],
  };
  const [topic, setTopic] = useState<TopicCreateRequest>(emptyTopic);

  const tagsCall = useQuery("tags", () => ApiService.fetchTags());
  const topicCreateCall = useMutation(ApiService.addTopic, {
    onSuccess: () => {
      navigate("/create/cookbook");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

  useEffect(() => {
    const shouldShowExitPrompt = !isTopicEmpty();
    if (showExitPrompt !== shouldShowExitPrompt) {
      setShowExitPrompt(shouldShowExitPrompt);
    }
  }, [topic]);

  const isTopicEmpty = (): boolean => {
    return JSON.stringify(topic) === JSON.stringify(emptyTopic);
  };

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
        <Title text="Create Topic" />
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
            <div>
              <Input
                onChange={(event) => {
                  getTopic(event.target.value);
                }}
                onBlur={(event) => {
                  onblurTopic(event.target.value);
                }}
                type={"outlined"}
                placeHolderText="Enter the name"
                style={{ marginTop: "10px" }}
                errorText={errors.name ? "* Topic not to be empty" : ""}
              />
            </div>
          </div>
          <div style={styles.inputsContainer}>
            <ActionableMultiSelectChip
              tags={
                tagsCall.data ? tagsCall.data.map((tag: Tag) => tag.name) : []
              }
              createNewTag={() => navigate(`/create/tag`)}
              onTagChange={onTagChange}
              title="Tags"
              errorMessage={errors.tags ? "* Topic atleast have one tag" : ""}
            />
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
                          marginRight: "20px",
                          width: "100%",
                        }}
                      >
                        <Input
                          onChange={(event) => {
                            onLinkChange(value.id, event.target.value);
                          }}
                          value={value.url}
                          type={"outlined"}
                          placeHolderText="Enter the Reference"
                          style={{ marginTop: "10px" }}
                          errorText=""
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
                <Button
                  buttonText="ADD"
                  onClick={addNewReference}
                  variant={"contained"}
                  buttonSize={"small"}
                  textColor={Theme.palette.text.primary}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ ...styles.buttonsContainer, ...{ flexDirection: "column" } }}
        >
          <Button
            buttonText="Save"
            onClick={onSave}
            variant={"contained"}
            buttonSize={"large"}
            textColor={Theme.palette.text.primary}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <Button
            buttonText="Add New CookBook"
            onClick={createNewCookBook}
            variant={"text"}
            buttonSize={"large"}
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
