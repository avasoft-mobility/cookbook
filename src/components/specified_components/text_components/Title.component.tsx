import React from "react";
import Text from "../../wrapper_components/Text.wrapperComponent";
import Theme from "../../../configs/ThemeConfig";

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div style={style.headingContainer}>
      <Text variant={"h4"} color={Theme.palette.primary.main}>
        {text}
      </Text>
    </div>
  );
};

const style = {
  headingContainer: {
    flex: 1,
  },
};

export default Title;
