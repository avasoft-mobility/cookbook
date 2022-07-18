import React from "react";
import Alert from "../../wrapper_components/Alert.WrapperComponent";

interface AuthorItemProps {
  name: string;
}

const AuthorItem: React.FC<AuthorItemProps> = (props) => {
  return (
    <Alert variant="outlined" severity="info" text={`Author: ${props.name}`} />
  );
};

export default AuthorItem;
