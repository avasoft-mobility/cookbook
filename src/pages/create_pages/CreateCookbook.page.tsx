import { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import StepWrapper from "../../components/specified_components/steps_components/StepWrapper.component";
import Clickable from "../../components/wrapper_components/ButtonWrapperComponent";
import Text from "../../components/wrapper_components/Text.wrapperComponent";

import { Box, CircularProgress } from "@mui/material";
import ActionableComboBox from "../../components/specified_components/actionable_components/ActionableComboBox.component";
import ActionableDropdown from "../../components/specified_components/actionable_components/ActionableDropdown.component";
import Title from "../../components/specified_components/text_components/Title.component";
import FileUpload from "../../components/wrapper_components/FileUpload.component";
import Theme from "../../configs/ThemeConfig";
import useErrorSnackbar from "../../hooks/useErrorSnackbar.hook";
import useExitPrompt from "../../hooks/useExitPrompt";
import useTabRouter from "../../hooks/useTabRouter.hook";
import Cookbook from "../../models/Cookbook.Model";
import CookbookCreateRequest from "../../models/request_response_models/CookbookCreate.request";
import ErrorResponse from "../../models/request_response_models/Error.Response.model";
import Step from "../../models/Step.Model";
import StepValue from "../../models/StepValue.model";
import ApiService from "../../services/ApiService";

const CreateCookbookPage = () => {
  let [cookbook, setCookbook] = useState<Cookbook>();
  const showErrorSnackBar = useErrorSnackbar();
  const navigate = useNavigate();
  const tabRouter = useTabRouter();
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  const routeParams = useParams();

  const stacksCall = useQuery("stacks", ApiService.getStacks);
  const topicsCall = useQuery("topics", ApiService.getTopics);
  const authorsCall = useQuery("authors", ApiService.fetchAuthors);
  const cookbookCall = useQuery(
    ["cookbook", routeParams.id],
    () => {
      if (routeParams.id !== undefined)
        return ApiService.fetchCookbook(routeParams.id);
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setCookbook(data);
        setNewCookbook({
          topicId: data!._id,
          stackId: data!.stack._id,
          authorName: data!.author.name,
          author: data!.author._id,
          sampleProjectUrl: data!.sampleProjectUrl,
          flowchartUrl: data!.flowchartUrl,
          steps: data!.steps,
        });
      },
      onError: (error: AxiosError) => {
        showErrorSnackBar((error.response?.data as ErrorResponse).message);
      },
    }
  );

  const createCookbookCall = useMutation(ApiService.createCookbook, {
    onSuccess: () => {
      navigate("/topics");
    },
    onError: (error: AxiosError) => {
      showErrorSnackBar((error.response?.data as ErrorResponse).message);
    },
  });

  const updateCookbookCall = useMutation(
    (data: { id: string; cookbook: CookbookCreateRequest }) => {
      return ApiService.updateCookbook(data.id, data.cookbook);
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

  const emptyCookbook: CookbookCreateRequest = {
    topicId: "",
    stackId: "",
    flowchartUrl: "",
    sampleProjectUrl: "",
    steps: [],
    authorName: "",
  };
  const [newCookbook, setNewCookbook] =
    useState<CookbookCreateRequest>(emptyCookbook);

  useEffect(() => {
    const shouldShowExitPrompt = !isCookbookEmpty();
    if (showExitPrompt !== shouldShowExitPrompt) {
      setShowExitPrompt(shouldShowExitPrompt);
    }
  }, [newCookbook]);

  const isCookbookEmpty = (): boolean => {
    return JSON.stringify(newCookbook) === JSON.stringify(emptyCookbook);
  };

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

  const onAuthorChanged = async (value: string) => {
    if (!value || value.trim() === "") {
      return;
    }

    const clonedCookbook = { ...newCookbook };
    clonedCookbook.authorName = value;
    setNewCookbook(clonedCookbook);
  };

  const isCookbookValid = () => {
    if (!newCookbook.topicId || newCookbook.topicId.trim() === "") {
      showErrorSnackBar("Choose any topic");
      return false;
    }

    if (!newCookbook.stackId || newCookbook.stackId.trim() === "") {
      showErrorSnackBar("Choose any stack");
      return false;
    }

    if (!newCookbook.authorName || newCookbook.authorName.trim() === "") {
      showErrorSnackBar("Choose any author");
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

    if (!routeParams.id) {
      createCookbookCall.mutate(newCookbook);
      return;
    }

    newCookbook.author = authorsCall.data?.find(
      (x) => x.name === newCookbook.authorName
    )?._id;
    updateCookbookCall.mutate({
      id: routeParams.id,
      cookbook: newCookbook,
    });
  };

  return cookbookCall.isFetching && routeParams.id ? (
    <Box sx={styles.centerAlign}>
      <CircularProgress />
    </Box>
  ) : (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <Title text={!routeParams.id ? "Create Cookbook" : "Update Cookbook"} />
      </div>
      <div style={styles.innerContainer}>
        <ActionableDropdown
          dialogValues={
            topicsCall.data ? topicsCall.data.map((topic) => topic.title) : []
          }
          onConfirm={onTopicChosed}
          onClickableClick={(event) => {
            tabRouter.navigate("/create/topic");
          }}
          dialogTitle={"Topic"}
          dialogHeader={"Choose Topic"}
          confirmationDialogvalue={
            cookbook !== undefined ? cookbook!.topic.title : "Choose the Topic"
          }
          clickableText={"Add Topic"}
        />
        <ActionableDropdown
          dialogValues={
            stacksCall.data ? stacksCall.data.map((stack) => stack.name) : []
          }
          onConfirm={onStackChosed}
          onClickableClick={(event) => {
            tabRouter.navigate("/create/stack");
          }}
          dialogTitle={"Stack"}
          dialogHeader={"Choose Stack"}
          confirmationDialogvalue={
            cookbook !== undefined ? cookbook!.stack.name : "Choose the Stack"
          }
          clickableText={"Add Stack"}
        />
        <ActionableComboBox
          title={"Authors"}
          onClickableClick={(event) => {
            tabRouter.navigate("/create/author");
          }}
          label={"Authors"}
          clickableText={"Add Author"}
          onChanged={onAuthorChanged}
          options={
            authorsCall.isSuccess
              ? authorsCall.data.map((author) => author.name)
              : [""]
          }
          defaultValue={cookbook !== undefined ? cookbook.author.name : ""}
        />
        <div style={styles.steps}>
          <Text variant="body1" color={Theme.palette.text.secondary}>
            Steps
          </Text>
          <StepWrapper
            onValueChange={onStepsChanged}
            onAddNew={onStepsChanged}
            onDelete={onStepsChanged}
            initialValues={cookbook !== undefined ? cookbook!.steps : undefined}
          />
        </div>

        <div>
          <div style={styles.fileUploadContainer}>
            <FileUpload
              onChange={onTechnicalFlowUpload}
              label={"Upload Technical Flow"}
              textColor={Theme.palette.text.secondary}
            />
          </div>
          <div style={styles.fileUploadContainer}>
            <FileUpload
              onChange={onSampleProjectUpload}
              label={"Upload Sample Code (in compressed format)"}
              textColor={Theme.palette.text.secondary}
            />
          </div>

          <div>
            <Clickable
              style={{ width: "100%" }}
              ClickableText={
                !routeParams.id ? "Add Cookbook" : "Update Cookbook"
              }
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
  centerAlign: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default CreateCookbookPage;
