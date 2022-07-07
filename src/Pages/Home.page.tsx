import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ApiService from "../services/ApiService";

import Search from "../components/Search.component";
import TopicItem from "../components/TopicItem.Component";
import Text from "../components/wrapper_components/Text.wrapperComponent";

import Theme from "../configs/ThemeConfig";
import Topic from "../models/Topic.Model";

const HomePage = () => {
  let [topics, setTopic] = useState<Topic[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = () => {
    const topics: Topic[] = ApiService.fetchTopics();
    setTopic(topics);
  };

  const onSearch = (searchText: string) => {
    const topics: Topic[] = ApiService.fetchTopics(searchText);
    setTopic(topics);
  };

  const onSelect = (topicId: string) => {
    navigate(`/topics/${topicId}`);
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
                <Grid key={topic.id} item xs={6}>
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
