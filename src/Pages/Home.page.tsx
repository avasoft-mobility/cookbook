import { useState } from "react";
import { useDebounce } from "use-debounce";

import { useNavigate } from "react-router-dom";

import ApiService from "../services/ApiService";

import Search from "../components/Search.component";
import Text from "../components/wrapper_components/Text.wrapperComponent";

import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";
import "../App.css";
import HomePageMainContent from "../components/HomePageMainContent.component";
import Theme from "../configs/ThemeConfig";
import Topic from "../models/Topic.Model";
import ErrorResponse from "../models/request_response_models/Error.Response.model";

const HomePage = () => {
  const { enqueueSnackbar } = useSnackbar();
  let [topics, setTopic] = useState<Topic[]>([]);
  let [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { isLoading } = useQuery(
    ["topics", debouncedSearchText],
    () => ApiService.fetchTopics(searchText),
    {
      onSuccess: (data) => {
        setTopic(data);
      },
      onError: (error: AxiosError) => {
        showSnackBar((error.response?.data as ErrorResponse).message, "error");
      },
    }
  );

  let navigate = useNavigate();

  const onSearch = (text: string) => {
    setSearchText(text);
  };

  const onSelect = (slug: string) => {
    navigate(`/topics/${slug}`);
  };

  const showSnackBar = (message: string, type: string) => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    });
  };

  return (
    <div style={styles.container}>
      <div className="innerContainer">
        <div style={{ marginBottom: "30px" }}>
          <Text variant="h3" color={Theme.palette.primary.main}>
            CookBook
          </Text>
        </div>
        <Search input={onSearch} />
      </div>
      <HomePageMainContent
        isLoading={isLoading}
        topics={topics}
        onSelect={onSelect}
      />
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
};

export default HomePage;
