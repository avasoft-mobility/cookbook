import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
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
import TopicCreateRequest from "../models/request_response_models/TopicCreate.request.model";

const TopicPage = () => {
  const navigate = useNavigate();
  const [references, setReferences] = useState([
    {
      id: uuid(),
      url: "",
    },
  ]);
  const [topicName, setTopicName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
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
  });

  const getTopic = (topic: string) => {
    setTopicName(topic);
  };

  const addNewReference = () => {
    setReferences([...references, { id: uuid(), url: "" }]);
  };

  const validate = () => {
    if (topicName === "") {
      setError(true);
      return;
    }

    setError(false);
  };

  const onSave = () => {
    const referenceurl: string[] = references.map((reference) => {
      return reference.url;
    });
    const clonedTopic = { ...topic };
    clonedTopic.name = topicName;
    clonedTopic.referenceUrls = referenceurl;
    topicCreateCall.mutate(clonedTopic);
  };

  const onCancel = () => {
    navigate(`/home`);
  };

  const deleteReferance = (id: string) => {
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
        <div style={{ width: "100%" }}>
          <Text variant="h6" color={Theme.palette.primary.main}>
            Name
          </Text>
          <div style={styles.topicInputContainer}>
            <Input
              onChange={(event) => {
                getTopic(event.target.value);
              }}
              inputTextStyle={{
                width: "100%",
                fontSize: "16px",
                color: Theme.palette.text.secondary,
              }}
            />
          </div>
          {error ? (
            <Text color={Color.errorMessage} variant="body2">
              Topic not to be empty
            </Text>
          ) : null}
          <div style={{ width: "100%", marginTop: "40px" }}>
            <Text variant="h6" color={Theme.palette.primary.main}>
              Tags
            </Text>
            <MultipleSelectChip
              inputLabel="Tags"
              values={tagsCall.data ? tagsCall.data.map((x) => x.name) : []}
              chipStyle={{ color: Theme.palette.primary.main }}
              menuItemStyle={{ color: Theme.palette.secondary.main }}
              onChange={(event) => onTagChange(event.target.value as string[])}
            />
          </div>
          <div style={{ width: "100%", marginTop: "40px" }}>
            <Text variant="h6" color={Theme.palette.primary.main}>
              Topic Flow Diagram
            </Text>
            <input
              style={styles.inputImage}
              type={"file"}
              onChange={onTopicUpload}
            />
          </div>
          <div style={{ display: "flex", flex: 1, width: "100%" }}>
            <div style={{ width: "100%", marginTop: "20px" }}>
              <Text variant="h6" color={Theme.palette.primary.main}>
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
                      <div style={styles.topicInputContainer}>
                        <Input
                          onChange={(event) => {
                            onLinkChange(value.id, event.target.value);
                          }}
                          value={value.url}
                          inputTextStyle={{
                            width: "100%",
                            fontSize: "16px",
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
        <div style={styles.createButtonContainer}>
          <Clickable
            ClickableText="Cancel"
            onClick={onCancel}
            variant={"text"}
            clickableSize={"small"}
            textColor={Theme.palette.primary.main}
          />
          <Clickable
            ClickableText="Save"
            onClick={onSave}
            variant={"contained"}
            clickableSize={"small"}
            textColor={Theme.palette.text.primary}
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
    padding: "30px 25%",
  },
  topicInputContainer: {
    display: "flex",
    flex: 1,
    border: "1px solid ",
    borderColor: Theme.palette.primary.main,
    padding: "5px",
    marginRight: "20px",
    marginTop: "8px",
  },
  addButtonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  createButtonContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "flex-end",
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
};

export default TopicPage;
