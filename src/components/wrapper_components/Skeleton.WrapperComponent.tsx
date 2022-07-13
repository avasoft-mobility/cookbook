import { Skeleton, SxProps, Theme } from "@mui/material";
import React from "react";

interface SkeletonWrapperProps {
  variant: "circular" | "rectangular" | "text";
  animation: "pulse" | "wave" | false;
  style?: SxProps<Theme>;
}

const SkeletonWrapper: React.FC<SkeletonWrapperProps> = (props) => {
  return (
    <Skeleton
      variant={props.variant}
      animation={props.animation}
      sx={props.style}
    />
  );
};

export default SkeletonWrapper;
