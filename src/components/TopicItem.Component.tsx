import { ButtonBase } from "@mui/material";
import React from "react";

import Text from "../components/wrapper_components/Text.wrapperComponent";
import Icon from "./wrapper_components/Icon.WrapperComponent";
import Pill from "./wrapper_components/Pill.WrapperComponent";

import "../App.css";
import Color from "../configs/ColorConfig";
import Theme from "../configs/ThemeConfig";
import Stack from "../models/Stack.Model";
import Tag from "../models/Tag.Model";
import Topic from "../models/Topic.Model";

interface TopicItemProps {
  topic: Topic;
  style?: React.CSSProperties;
  onSelect: Function;
}

const TopicItem: React.FC<TopicItemProps> = ({ topic, style, onSelect }) => {
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
      onClick={() => onSelect(topic.slug)}
    >
      <div style={{ ...styles.topicContainer, ...style }} className="topicItem">
        <div
          style={{ ...styles.innerContainer, ...{ flexDirection: "column" } }}
        >
          <div>
            <Text variant="h4" color={Theme.palette.secondary.main}>
              {topic.title}
            </Text>
            <div className="tagsContainer">
              {topic.tags.map((item: Tag) => {
                return (
                  <div key={item._id} style={styles.pills}>
                    <Pill label={item.name} color={Color.tagColor} />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            {topic.stacks.map((stack: Stack) => {
              return getIcon(stack.name);
            })}
          </div>
        </div>
      </div>
    </ButtonBase>
  );
};

const styles = {
  topicContainer: {
    backgroundColor: Theme.palette.text.primary,
    boxShadow: "0px 0px 23px 1px rgba(0, 0, 0, 0.1)",
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
