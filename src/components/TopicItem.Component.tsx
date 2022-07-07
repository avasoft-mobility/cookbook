import React from "react";
import { ButtonBase } from "@mui/material";

import Text from "../components/wrapper_components/Text.wrapperComponent";
import Icon from "./wrapper_components/Icon.WrapperComponent";
import Pill from "./wrapper_components/Pill.WrapperComponent";

import Topic from "../models/Topic.Model";

interface TopicItemProps {
  topic: Topic;
  style?: React.CSSProperties;
}

const TopicItem: React.FC<TopicItemProps> = ({ topic, style }) => {
  const getIcon = (stackName: string) => {
    if (stackName === "React Native") {
      return <Icon key={stackName} type="reactNative" style={styles.icon} />;
    }
    if (stackName === "Native Android") {
      return <Icon key={stackName} type="androidStudio" style={styles.icon} />;
    }
    if (stackName === "Native Ios") {
      return <Icon key={stackName} type="swift" style={styles.icon} />;
    }
    if (stackName === "Flutter") {
      return <Icon key={stackName} type="flutter" style={styles.icon} />;
    }
    if (stackName === "Xamarin Forms") {
      return <Icon key={stackName} type="xamarin" style={styles.icon} />;
    }
  };

  return (
    <ButtonBase
      style={{ textAlign: "left", width: "100%", borderRadius: "16px" }}
    >
      <div style={{ ...styles.topicContainer, ...style }}>
        <div
          style={{ ...styles.innerContainer, ...{ flexDirection: "column" } }}
        >
          <div>
            <Text variant="h4" color="#648DE5">
              {topic.title}
            </Text>
            <div style={styles.tagsContainer}>
              {topic.tags.map((item: string) => {
                return (
                  <div key={item} style={styles.pills}>
                    <Pill label={item} color="primary" />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {topic.cookbooks.map((cookbook: any) => {
              return getIcon(cookbook.stack.name as string);
            })}
          </div>
        </div>
      </div>
    </ButtonBase>
  );
};

const styles = {
  topicContainer: {
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
