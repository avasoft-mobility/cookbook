import React from "react";
import Title from "../text_components/Title.component";

interface CreateCookbookTitleProps {
  Title: string;
}

const CreateCookbookTitle: React.FC<CreateCookbookTitleProps> = (props) => {
  return (
    <div style={styles.innerContainer}>
      <Title text={props.Title} />
    </div>
  );
};

const styles = {
  innerContainer: {
    flex: 1,
    padding: "30px 20%",
  },
};

export default CreateCookbookTitle;
