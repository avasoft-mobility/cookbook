import { Grid } from "@mui/material";
import React from "react";
import Topic from "../../../models/Topic.Model";
import SkeletonLoader from "./SkeletonLoader.Component";
import TopicItem from "../topic_item_components/TopicItem.Component";
import Text from "../../wrapper_components/Text.wrapperComponent";

interface HomePageMainContentProps {
  isLoading: boolean;
  topics: Topic[];
  onSelect: Function;
}

const HomePageMainContent: React.FC<HomePageMainContentProps> = ({
  isLoading,
  topics,
  onSelect,
}) => {
  if (isLoading) {
    return (
      <div className="innerContainer">
        <SkeletonLoader />
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="innerContainer">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text variant={"h6"} color={""}>
            No Topics Found
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="innerContainer">
      {topics !== undefined ? (
        <Grid
          container
          spacing={{ xs: 7 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
        >
          {topics.map((topic: Topic) => {
            return (
              <Grid key={topic.slug} item xs={12} sm={6} md={6}>
                <TopicItem topic={topic} onSelect={onSelect} />
              </Grid>
            );
          })}
        </Grid>
      ) : null}
    </div>
  );
};

export default HomePageMainContent;
