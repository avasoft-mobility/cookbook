import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";

import ApiService from "../../services/ApiService";

import Clickable from "../../components/wrapper_components/ButtonWrapperComponent";
import CreateHeader from "../../components/specified_components/create_topic_page_components/CreateHeader.Component";
import TopicForm from "../../components/specified_components/create_topic_page_components/TopicForm.Component";

import Color from "../../configs/ColorConfig";
import useErrorSnackbar from "../../hooks/useErrorSnackbar.hook";
import useTabRouter from "../../hooks/useTabRouter.hook";
import ErrorResponse from "../../models/request_response_models/Error.Response.model";
import TopicCreateRequest from "../../models/request_response_models/TopicCreate.request.model";
import useExitPrompt from "../../hooks/useExitPrompt";
import Tag from "../../models/Tag.Model";

const TopicPage = () => {
  const showErrorSnackBar = useErrorSnackbar();
  const navigate = useNavigate();
  const tabRouter = useTabRouter();
  const [showExitPrompt, setShowExitPrompt] = useExitPrompt(false);
  const { slug } = useParams();

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
        navigate(`/topics/${slug}`);
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

  const onSave = (newTopic: TopicCreateRequest) => {
    const tagIds = newTopic.tags?.map((tagName) => {
      const tag = tagsCall.data?.find((x) => x.name === tagName);
      return tag!._id;
    });

    newTopic.tags = tagIds;

    if (slug) {
      updateTopic(topicCall.data?._id!, newTopic);
      return;
    }

    createTopic(newTopic);
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

  const onCreateNewCookBook = () => {
    navigate(`/create/cookbook`);
  };

  const onCreateNewTag = () => {
    navigate(`/create/tag`);
  };

  return (
    <div style={styles.container}>
      <CreateHeader title={slug ? "Update Topic" : "Create Topic"} />
      <TopicForm
        tags={tagsCall.data ? tagsCall.data.map((tag: Tag) => tag.name) : []}
        topic={topic}
        createNewTag={onCreateNewTag}
        submitButtonValue={slug ? "Update Topic" : "Save Topic"}
        onSave={onSave}
      />
      <div style={styles.innerContainer}>
        <Clickable
          ClickableText="Add New CookBook"
          onClick={onCreateNewCookBook}
          variant={"text"}
          clickableSize={"large"}
          textColor={Color.lightTextSecondaryColor}
          style={styles.button}
        />
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
    padding: "0 20%",
    alignItems: "center",
  },
  button: {
    width: "100%",
    fontWeight: "400",
  },
};

export default TopicPage;
