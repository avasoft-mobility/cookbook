import React from "react";

export default function useTabRouter() {
  const tabRouter = (url: string) => {
    window.open(window.location.origin + `${url}`);
  };

  return { tabRouter };
}
