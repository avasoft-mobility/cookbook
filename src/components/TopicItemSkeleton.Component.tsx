import Color from "../configs/ColorConfig";
import SkeletonWrapper from "./wrapper_components/Skeleton.WrapperComponent";

const TopicItemSkeleton = () => {
  const getRandomTextWidth = () => {
    let value = Math.random() * (100 - 80) + 80;
    return value + "%";
  };

  return (
    <div
      style={{
        ...styles.topicItem,
        ...{ flexDirection: "column", justifyContent: "space-between" },
      }}
    >
      <div>
        <SkeletonWrapper
          animation="wave"
          variant="rectangular"
          style={{
            width: getRandomTextWidth(),
            bgcolor: Color.skeletonColor,
            height: "55px",
          }}
        />
        <div style={{ display: "flex", marginTop: "12px" }}>
          {[90, 80].map((width: number, index: number) => {
            return (
              <SkeletonWrapper
                key={index}
                animation="wave"
                variant="rectangular"
                style={{
                  width: width,
                  bgcolor: Color.skeletonColor,
                  height: 30,
                  borderRadius: 20,
                  marginRight: "10px",
                }}
              />
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        {[1, 2, 3, 4, 5].map((value: number) => {
          return (
            <SkeletonWrapper
              key={value}
              animation="wave"
              variant="circular"
              style={{
                bgcolor: Color.skeletonColor,
                width: 30,
                height: 30,
                marginRight: "10px",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  topicItem: {
    height: "250px",
    display: "flex",
    flex: 1,
    boxShadow: "0px 0px 23px 1px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
    padding: "25px",
  },
};

export default TopicItemSkeleton;
