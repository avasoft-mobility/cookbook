import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { v4 as uuid } from "uuid";

import ApiService from "../../services/ApiService";

import Clickable from "../../components/wrapper_components/ButtonWrapperComponent";
import Icon from "../../components/wrapper_components/Icon.WrapperComponent";
import IconButton from "../../components/wrapper_components/IconButton.WrapperComponent";
import Input from "../../components/wrapper_components/Input.WrapperComponent";
import Text from "../../components/wrapper_components/Text.wrapperComponent";
import ActionableMultiSelectChip from "../../components/specified_components/actionable_components/ActionableMultiSelectChip.Component";

import Color from "../../configs/ColorConfig";
import Theme from "../../configs/ThemeConfig";
import useErrorSnackbar from "../../hooks/useErrorSnackbar.hook";
import useTabRouter from "../../hooks/useTabRouter.hook";
import ErrorResponse from "../../models/request_response_models/Error.Response.model";
import TopicCreateRequest from "../../models/request_response_models/TopicCreate.request.model";
import useExitPrompt from "../../hooks/useExitPrompt";
import Tag from "../../models/Tag.Model";
import Title from "../../components/specified_components/text_components/Title.component";

interface TopicErrors {
  name: boolean;
  tags: boolean;
  fileUpload?: boolean;
}

interface ReferenceURI {
  id: string;
  url: string;
}

const TopicPage = () => {
  const showErrorSnackBar = useErrorSnackbar();
  const navigate = useNavigate();
  const tabRouter = useTabRouter();
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  const { slug } = useParams();

  const [references, setReferences] = useState<ReferenceURI[]>([
    {
      id: uuid(),
      url: "",
    },
  ]);
  const [errors, setErrors] = useState<TopicErrors>({
    name: false,
    tags: false,
  });

  const emptyTopic: TopicCreateRequest = {
    title: "",
    flowchartUrl: "",
    tags: [],
    referenceUrls: [],
  };
  const [topic, setTopic] = useState<TopicCreateRequest>(emptyTopic);

  const tagsCall = useQuery("tags", () => ApiService.fetchTags());
  const topicCall = useQuery(
    ["topic", slug],
    () => {
      if (slug) {
        return ApiService.fetchTopic(slug);
      }
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data) {
          const clonedTopic = { ...topic };

          clonedTopic.title = data.title;
          clonedTopic.flowchartUrl = data.flowchartUrl;
          clonedTopic.tags = data.tags.map((tags) => {
            return tags.name;
          });
          clonedTopic.referenceUrls = data.referenceUrls;

          const referenceUrlArray: ReferenceURI[] = data.referenceUrls.map(
            (reference: string) => {
              return {
                id: uuid(),
                url: reference,
              };
            }
          );

          setReferences(referenceUrlArray);

          setTopic(clonedTopic);
        }
      },
    }
  );

  const topicCreateCall = useMutation(ApiService.addTopic, {
    onSuccess: () => {
      navigate("/create/cookbook");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

  const topicUpdateCall = useMutation(
    (data: { id: string; editedtopic: TopicCreateRequest }) => {
      return ApiService.updateTopic(data.id, data.editedtopic);
    },
    {
      onSuccess: () => {
        navigate("/topics");
      },
      onError: (error: AxiosError) => {
        showErrorSnackBar((error.response?.data as ErrorResponse).message);
      },
    }
  );

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
    clonedTopic.title = topicInput;

    setTopic(clonedTopic);
    validateName();
  };

  const onblurTopic = (topicInput: string) => {
    const clonedTopic = { ...topic };
    clonedTopic.title = topicInput;

    setTopic(clonedTopic);
    validateName();
  };

  const addNewReference = () => {
    setReferences([...references, { id: uuid(), url: "" }]);
  };

  const validateName = () => {
    const clonedErrors = { ...errors };

    if (topic.title === "") {
      clonedErrors.name = true;
    }
    if (topic.title !== "") {
      clonedErrors.name = false;
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

    if (topic.title === "") {
      clonedErrors.name = true;
    }
    if (topic.title !== "") {
      clonedErrors.name = false;
    }
    if (topic.tags?.length === 0) {
      clonedErrors.tags = true;
    }
    if (topic.tags?.length !== 0) {
      clonedErrors.tags = false;
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
    const tagIds = topic.tags?.map((tagName) => {
      const tag = tagsCall.data?.find((x) => x.name === tagName);
      return tag!._id;
    });
    clonedTopic.tags = tagIds;
    clonedTopic.referenceUrls = referenceurl;

    if (!validate()) {
      if (slug) {
        updateTopic(topicCall.data?._id!, clonedTopic);
        return;
      }
      createTopic(clonedTopic);
    }
  };

  const updateTopic = (id: string, clonedTopic: TopicCreateRequest) => {
    topicUpdateCall.mutate({
      id: topicCall.data?._id!,
      editedtopic: clonedTopic,
    });
  };

  const createTopic = (clonedTopic: TopicCreateRequest) => {
    topicCreateCall.mutate(clonedTopic);
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
    const clonedTopic = { ...topic };
    clonedTopic.tags = values;

    setTopic(clonedTopic);
    validateTags(values);
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
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.innerContainer }}>
        <Title text={slug ? "Update Topic" : "Create Topic"} />
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
                value={topic.title}
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
              defaultValues={topic.tags ? topic.tags : []}
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
            ClickableText={slug ? "Update Topic" : "Save Topic"}
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
