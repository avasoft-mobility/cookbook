import React from "react";
import { useSnackbar } from "notistack";

export default function useErrorSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  const showErrorSnackBar = (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        horizontal: "right",
        vertical: "top",
      },
    });
  };

  return (message: string) => {
    showErrorSnackBar(message);
  };
}
