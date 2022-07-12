import { Grid } from "@mui/material";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { useNavigate } from "react-router-dom";

import ApiService from "../services/ApiService";

import Search from "../components/Search.component";
import TopicItem from "../components/TopicItem.Component";
import Text from "../components/wrapper_components/Text.wrapperComponent";

import Theme from "../configs/ThemeConfig";
import Topic from "../models/Topic.Model";
import { useQuery } from "react-query";

const HomePage = () => {
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
      onError: () => {},
    }
  );

  let navigate = useNavigate();

  const onSearch = (text: string) => {
    setSearchText(text);
  };

  const onSelect = (slug: string) => {
    navigate(`/topics/${slug}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <div style={{ marginBottom: "30px" }}>
          <Text variant="h4" color={Theme.palette.primary.main}>
            CookBook
          </Text>
        </div>
        <Search input={onSearch} />
      </div>
      <div style={styles.innerContainer}>
        {topics !== undefined ? (
          <Grid container spacing={10}>
            {topics.map((topic: Topic) => {
              return (
                <Grid key={topic._id} item xs={6}>
                  <TopicItem topic={topic} onSelect={onSelect} />
                </Grid>
              );
            })}
          </Grid>
        ) : null}
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
};

export default HomePage;
