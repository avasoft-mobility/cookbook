import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import StepWrapper from "../components/StepWrapper.component";
import Clickable from "../components/wrapper_components/ButtonWrapperComponent";
import ConfirmationDialog from "../components/wrapper_components/ConfirmationDialog.WrapperComponent";
import Text from "../components/wrapper_components/Text.wrapperComponent";
import Color from "../configs/ColorConfig";

import Theme from "../configs/ThemeConfig";
import useErrorSnackbar from "../hooks/useErrorSnackbar.hook";
import useTabRouter from "../hooks/useTabRouter.hook";
import CookbookCreateRequest from "../models/request_response_models/CookbookCreate.request";
import ErrorResponse from "../models/request_response_models/Error.Response.model";
import Step from "../models/Step.Model";
import StepValue from "../models/StepValue.model";
import ApiService from "../services/ApiService";

const CreateCookbookPage = () => {
  const showErrorSnackBar = useErrorSnackbar();
  const navigate = useNavigate();
  const { tabRouter } = useTabRouter();

  const stacksCall = useQuery("stacks", ApiService.getStacks);
  const topicsCall = useQuery("topics", ApiService.getTopics);
  const createCookbookCall = useMutation(ApiService.createCookbook, {
    onSuccess: () => {
      navigate("/topics");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

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

  const onStepsChanged = async (steps: StepValue[]) => {
    if (steps.length === 0) {
      return;
    }

    steps = steps.map((step, index) => {
      step.id = (index + 1).toString();
      return step;
    });

    const clonedCookbook = { ...newCookbook };
    clonedCookbook.steps = steps as Step[];
    setNewCookbook(clonedCookbook);
  };

  const isCookbookValid = () => {
    if (!newCookbook.topicId || newCookbook.topicId.trim() === "") {
      console.log("asd");

      showErrorSnackBar("Choose any topic");
      return false;
    }

    if (!newCookbook.stackId || newCookbook.stackId.trim() === "") {
      showErrorSnackBar("Choose any stack");
      return false;
    }

    if (!newCookbook.flowchartUrl || newCookbook.flowchartUrl.trim() === "") {
      showErrorSnackBar("You must upload one flowchart for cookbook");
      return false;
    }

    if (
      !newCookbook.sampleProjectUrl ||
      newCookbook.sampleProjectUrl.trim() === ""
    ) {
      showErrorSnackBar("You must upload one sample code for this cookbook");
      return false;
    }

    if (!newCookbook.steps || newCookbook.steps.length === 0) {
      showErrorSnackBar("You should have atleast one step");
      return false;
    }

    return true;
  };

  const onCookbookSave = () => {
    if (!isCookbookValid()) {
      return;
    }

    createCookbookCall.mutate(newCookbook);
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
        <div style={styles.spaceBetween}>
          <ConfirmationDialog
            title="Topic"
            dialogHeader="Choose Topic"
            dialogValues={
              topicsCall.data ? topicsCall.data.map((topic) => topic.title) : []
            }
            value={"Choose the Topic"}
            onConfirm={onTopicChosed}
          />
          <div style={styles.buttonConatiner}>
            <Clickable
              ClickableText={"Add Topic"}
              variant={"text"}
              clickableSize={"large"}
              onClick={(event) => {
                tabRouter("/create/topic");
              }}
              textColor={Color.primaryColor}
              style={{ width: "150px", height: "50px" }}
            />
          </div>
        </div>

        <div style={styles.spaceBetween}>
          <ConfirmationDialog
            title="Stack"
            dialogHeader="Choose Stack"
            dialogValues={
              stacksCall.data ? stacksCall.data.map((stack) => stack.name) : []
            }
            value={"Choose the Stack"}
            onConfirm={onStackChosed}
          />
          <div style={styles.buttonConatiner}>
            <Clickable
              ClickableText={"Add Stack"}
              variant={"text"}
              clickableSize={"large"}
              onClick={(event) => {
                tabRouter("/create/stack");
              }}
              textColor={Color.primaryColor}
              style={{ width: "150px", height: "50px" }}
            />
          </div>
        </div>

        <div style={styles.steps}>
          <Text variant="body1" color={Theme.palette.text.secondary}>
            Steps
          </Text>
          <StepWrapper
            onValueChange={onStepsChanged}
            onAddNew={onStepsChanged}
            onDelete={onStepsChanged}
          />
        </div>

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
  steps: {
    marginTop: "10px",
  },
  buttonConatiner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: "8px",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default CreateCookbookPage;
