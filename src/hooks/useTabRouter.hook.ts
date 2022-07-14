import React from "react";

export default function useTabRouter() {
  const navigate = (url: string) => {
    window.open(window.location.origin + `${url}`);
  };

  return { navigate };
}
