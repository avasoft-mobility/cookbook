import React from "react";

import Text from "../components/wrapper_components/Text.wrapperComponent";
import Icon from "./wrapper_components/Icon.WrapperComponent";
import Pill from "./wrapper_components/Pill.WrapperComponent";

interface TopicItemProps {
  topic: any;
  style?: React.CSSProperties;
}

const TopicItem: React.FC<TopicItemProps> = (props) => {
  const getIcon = (stack: string) => {
    if (stack === "React Native") {
      return <Icon type="reactNative" style={styles.icon} />;
    }
    if (stack === "Native Android") {
      return <Icon type="androidStudio" style={styles.icon} />;
    }
    if (stack === "Native Ios") {
      return <Icon type="swift" style={styles.icon} />;
    }
    if (stack === "Flutter") {
      return <Icon type="flutter" style={styles.icon} />;
    }
    if (stack === "Xamarin Forms") {
      return <Icon type="xamarin" style={styles.icon} />;
    }
  };

  return (
    <div style={{ ...styles.topicContaner, ...props.style }}>
      <div style={{ ...styles.innerContainer, ...{ flexDirection: "column" } }}>
        <div>
          <Text variant="h4" color="#648DE5">
            {props.topic.name}
          </Text>
          <div style={styles.tagsContainer}>
            {props.topic.tags.map((item: any) => {
              return (
                <div style={styles.pills}>
                  <Pill label={item} color="primary" />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {props.topic.supportedCommunity.map((stack: string) => {
            return getIcon(stack);
          })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  topicContaner: {
    display: "flex",
    flex: 1,
    height: "250px",
    padding: "25px",
    borderRadius: "16px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 23px 1px rgba(0, 0, 0, 0.25)",
  },
  innerContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  tagsContainer: {
    marginTop: "12px",
  },
  pills: {
    marginRight: "10px",
    backgrounColor: "red",
    display: "inline-block",
    marginBottom: "7px",
  },
  icon: {
    width: "24px",
    height: "24px",
    marginRight: "12px",
  },
};

export default TopicItem;
