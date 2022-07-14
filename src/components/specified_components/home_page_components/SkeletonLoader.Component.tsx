import { Grid } from "@mui/material";

import TopicItemSkeleton from "../topic_item_components/TopicItemSkeleton.Component";

const SkeletonLoader = () => {
  const getRandomTextWidth = () => {
    let value = Math.random() * (100 - 80) + 80;
    return value + "%";
  };

  return (
    <Grid container spacing={{ xs: 7 }} columns={{ xs: 12, sm: 12, md: 12 }}>
      {[1, 2, 3, 4].map((value: number) => {
        return (
          <Grid key={value} item xs={12} sm={6} md={6}>
            <TopicItemSkeleton />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SkeletonLoader;
