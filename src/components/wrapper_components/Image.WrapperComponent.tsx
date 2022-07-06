import React from "react";

interface ImageProps {
  imagePath: string;
  style?: React.CSSProperties;
}

const Image: React.FC<ImageProps> = (props) => {
  return (
    <img
      src={props.imagePath}
      alt={props.imagePath}
      style={{ ...styles.image, ...props.style }}
    />
  );
};

const styles = {
  image: {
    width: "100%",
  },
};

export default Image;
