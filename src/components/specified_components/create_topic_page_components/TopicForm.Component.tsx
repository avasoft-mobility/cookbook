import React, { ChangeEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import ApiService from "../../../services/ApiService";

import ActionableMultiSelectChip from "../../specified_components/actionable_components/ActionableMultiSelectChip.Component";
import Clickable from "../../wrapper_components/ButtonWrapperComponent";
import Input from "../../wrapper_components/Input.WrapperComponent";
import Text from "../../wrapper_components/Text.wrapperComponent";

import Theme from "../../../configs/ThemeConfig";
import TopicCreateRequest from "../../../models/request_response_models/TopicCreate.request.model";
import FileUpload from "../../wrapper_components/FileUpload.component";
import ReferenceUrlMultiplier from "../referenceurl_components/ReferenceUrlMultiplier.Component";
import { ReferenceURL } from "../referenceurl_components/ReferenceUrlItem.Component";

interface TopicErrors {
  name: boolean;
  tags: boolean;
}

interface TopicFormProps {
  tags: string[];
  createNewTag: Function;
  submitButtonValue: string;
  onSave: (newTopic: TopicCreateRequest) => void;
  topic: TopicCreateRequest;
}

const TopicForm: React.FC<TopicFormProps> = (props) => {
  const [references, setReferences] = useState<ReferenceURL[]>([
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

  useEffect(() => {
    setTopic(props.topic);
    const referenceUrls = props.topic.referenceUrls?.map((url: string) => {
      return {
        id: uuid(),
        url: url,
      };
    });
    setReferences(
      referenceUrls !== undefined && referenceUrls?.length === 0
        ? [{ id: uuid(), url: "" }]
        : (referenceUrls as ReferenceURL[])
    );
  }, [props.topic]);

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

    if (clonedErrors.name || clonedErrors.tags) {
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
      props.onSave(clonedTopic);
    }
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
    <div style={styles.innerContainer as React.CSSProperties}>
      <div>
        <div>
          <Text variant="body2" color={Theme.palette.text.secondary}>
            Name
          </Text>
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
        <div style={styles.inputsContainer}>
          <ActionableMultiSelectChip
            tags={props.tags}
            defaultValues={topic.tags ? topic.tags : []}
            createNewTag={() => props.createNewTag()}
            onTagChange={onTagChange}
            title="Tags"
            errorMessage={errors.tags ? "* Topic atleast have one tag" : ""}
          />
        </div>
        <div style={styles.inputsContainer}>
          <FileUpload
            onChange={onTopicUpload}
            label={"Topic Flow Diagram"}
            textColor={Theme.palette.text.secondary}
          />
        </div>
        <div style={styles.inputsContainer}>
          <Text variant="body2" color={Theme.palette.text.secondary}>
            Reference
          </Text>
          <ReferenceUrlMultiplier
            referenceUrls={references}
            onLinkChange={onLinkChange}
            deleteReferance={deleteReferance}
            addNewReference={addNewReference}
          />
        </div>
      </div>
      <Clickable
        ClickableText={props.submitButtonValue}
        onClick={onSave}
        variant={"contained"}
        clickableSize={"large"}
        textColor={Theme.palette.text.primary}
        style={styles.button}
      />
    </div>
  );
};

const styles = {
  innerContainer: {
    display: "flex",
    flex: 1,
    padding: "30px 20%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  inputsContainer: {
    width: "100%",
    marginTop: "10px",
  },
  button: {
    width: "100%",
    marginTop: "30px",
  },
};

export default TopicForm;
