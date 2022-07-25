import React from "react";
import Title from "../text_components/Title.component";

interface CreateHeaderProps {
  title: string;
}

const CreateHeader: React.FC<CreateHeaderProps> = ({title}) => {
  return (
    <div style={{ ...styles.innerContainer }}>
      <Title text={title} />
    </div>
  );
};

const styles = {
  innerContainer: {
    display: "flex",
    flex: 1,
    padding: "30px 20%",
  },
};

export default CreateHeader;
