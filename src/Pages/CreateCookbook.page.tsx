import { useSnackbar } from "notistack";
import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";
import Clickable from "../components/wrapper_components/ButtonWrapperComponent";
import ConfirmationDialog from "../components/wrapper_components/ConfirmationDialog.WrapperComponent";
import Text from "../components/wrapper_components/Text.wrapperComponent";

import Theme from "../configs/ThemeConfig";
import CookbookCreateRequest from "../models/request_response_models/CookbookCreate.request";
import ApiService from "../services/ApiService";

const CreateCookbookPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const stacksCall = useQuery("stacks", ApiService.getStacks);
  const topicsCall = useQuery("topics", ApiService.getTopics);

  const [newCookbook, setNewCookbook] = useState<CookbookCreateRequest>({
    topicId: "",
    stackId: "",
    flowchartUrl: "",
    sampleProjectUrl: "",
    steps: [],
  });

  const onTopicChosed = (value: string) => {
    const clonedCookbook = { ...newCookbook };
    const topic = topicsCall.data?.find((x) => x.title === value);

    clonedCookbook.topicId = topic!._id;
    setNewCookbook(clonedCookbook);
  };

  const onStackChosed = (value: string) => {
    const clonedCookbook = { ...newCookbook };
    const stack = stacksCall.data?.find((x) => x.name === value);

    clonedCookbook.stackId = stack!._id;
    setNewCookbook(clonedCookbook);
  };

  const onTechnicalFlowUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files?.length === 0) {
      return;
    }

    const response = await ApiService.uploadFile(files!.item(0)!);
    const clonedCookbook = { ...newCookbook };

    clonedCookbook.flowchartUrl = response.url;
    setNewCookbook(clonedCookbook);
  };

  const onSampleProjectUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files?.length === 0) {
      return;
    }

    const response = await ApiService.uploadFile(files!.item(0)!);
    const clonedCookbook = { ...newCookbook };

    clonedCookbook.sampleProjectUrl = response.url;
    setNewCookbook(clonedCookbook);
  };

  const isCookbookValid = () => {
    if (!newCookbook.topicId || newCookbook.topicId.trim() === "") {
      console.log("asd");

      enqueueSnackbar("Choose any topic", { variant: "error" });
      return false;
    }

    if (!newCookbook.stackId || newCookbook.stackId.trim() === "") {
      enqueueSnackbar("Choose any stack", { variant: "error" });
      return false;
    }

    if (!newCookbook.flowchartUrl || newCookbook.flowchartUrl.trim() === "") {
      enqueueSnackbar("You must upload one flowchart for cookbook", {
        variant: "error",
      });
      return false;
    }

    if (
      !newCookbook.sampleProjectUrl ||
      newCookbook.sampleProjectUrl.trim() === ""
    ) {
      enqueueSnackbar("You must upload one sample code for this cookbook", {
        variant: "error",
      });
      return false;
    }

    if (!newCookbook.steps || newCookbook.steps.length === 0) {
      enqueueSnackbar("You have atleast one step", {
        variant: "error",
      });
      return false;
    }

    return true;
  };

  const onCookbookSave = () => {
    if (!isCookbookValid()) {
      return;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div>
          <Text variant="h4" color={Theme.palette.primary.main}>
            Create CookBook
          </Text>
        </div>
      </div>
      <div style={styles.innerContainer}>
        <ConfirmationDialog
          title="Topic"
          dialogHeader="Choose Topic"
          dialogValues={
            topicsCall.data ? topicsCall.data.map((topic) => topic.title) : []
          }
          value={"Choose the Topic"}
          onConfirm={onTopicChosed}
        />
        <ConfirmationDialog
          title="Stack"
          dialogHeader="Choose Stack"
          dialogValues={
            stacksCall.data ? stacksCall.data.map((stack) => stack.name) : []
          }
          value={"Choose the Stack"}
          onConfirm={onStackChosed}
        />

        <div>
          <div style={styles.fileUploadContainer}>
            <Text variant="body2" color={Theme.palette.text.secondary}>
              Upload Technical Flow
            </Text>
            <input
              type="file"
              style={styles.fileUploadItem}
              onChange={onTechnicalFlowUpload}
            />
          </div>
          <div style={styles.fileUploadContainer}>
            <Text variant="body2" color={Theme.palette.text.secondary}>
              Upload Sample Code (in compressed format)
            </Text>
            <input
              type="file"
              style={styles.fileUploadItem}
              onChange={onSampleProjectUpload}
            />
          </div>

          <div>
            <Clickable
              style={{ width: "100%" }}
              ClickableText="Add Cookbook"
              clickableSize="large"
              variant="contained"
              onClick={onCookbookSave}
            />
          </div>
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
    flex: 1,
    padding: "30px 20%",
  },
  fileUploadContainer: {
    margin: "30px 0px",
  },
  fileUploadItem: {
    marginTop: "10px",
  },
};

export default CreateCookbookPage;
