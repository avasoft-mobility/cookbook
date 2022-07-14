import { useState, useEffect } from "react";

const initBeforeUnLoad = (showExitPrompt: boolean) => {
  window.onbeforeunload = (event) => {
    if (showExitPrompt) {
      const e = event || window.event;
      e.preventDefault();
      if (e) {
        e.returnValue = "";
      }
      return "";
    }
  };
};

// Hook
export default function useExitPrompt(
  defaultValue: boolean = true
): [boolean, (value: boolean) => void] {
  const [showExitPrompt, setShowExitPrompt] = useState<boolean>(defaultValue);

  window.onload = function () {
    initBeforeUnLoad(showExitPrompt);
  };

  useEffect(() => {
    initBeforeUnLoad(showExitPrompt);
  }, [showExitPrompt]);

  return [showExitPrompt, setShowExitPrompt];
}
