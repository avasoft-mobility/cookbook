import { Grid, Skeleton } from "@mui/material";

import Color from "../configs/ColorConfig";

const SkeletonLoader = () => {
  const getRandomTextWidth = () => {
    let value = Math.random() * (100 - 80) + 80;
    return value + "%";
  };

  return (
    <Grid container spacing={{ xs: 7 }} columns={{ xs: 12, sm: 12, md: 12 }}>
      {[1, 2, 3, 4].map((num: number) => {
        return (
          <Grid key={num} item xs={12} sm={6} md={6}>
            <div
              style={{
                ...styles.topicItem,
                ...{ flexDirection: "column", justifyContent: "space-between" },
              }}
            >
              <div>
                <Skeleton
                  variant="text"
                  animation="wave"
                  height={80}
                  sx={{
                    ...styles.textSkeleton,
                    ...{ width: getRandomTextWidth() },
                  }}
                />
                <div style={{ display: "flex" }}>
                  {[90, 80].map((width: number) => {
                    return (
                      <Skeleton
                        key={width}
                        variant="rectangular"
                        animation="wave"
                        sx={{ ...styles.chipSkeleton, ...{ width: width } }}
                      />
                    );
                  })}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                {[1, 2, 3, 4, 5].map((num: number) => {
                  return (
                    <Skeleton
                      key={num}
                      variant="circular"
                      animation="wave"
                      sx={styles.logoSkeleton}
                    />
                  );
                })}
              </div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

const styles = {
  logoSkeleton: {
    bgcolor: Color.skeletonColor,
    width: 30,
    height: 30,
    marginRight: "10px",
  },
  topicItem: {
    height: "250px",
    display: "flex",
    flex: 1,
    boxShadow: "0px 0px 23px 1px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
    padding: "25px",
  },
  textSkeleton: {
    bgcolor: Color.skeletonColor,
  },
  chipSkeleton: {
    bgcolor: Color.skeletonColor,
    width: 100,
    height: 30,
    borderRadius: 20,
    marginRight: "10px",
  },
};

export default SkeletonLoader;
