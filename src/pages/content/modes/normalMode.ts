import { useVimStore } from "../store/useVimStore";

export const handleNormalMode = (key: string, sequence: string) => {
  const { enterInsertMode, enterVisualMode, clearKeySequence } =
    useVimStore.getState();

  switch (key) {
    case "G":
      scrollToBottom();
      clearKeySequence();
      break;
    case "i":
      enterInsertMode();
      break;
    case "v":
      enterVisualMode();
      break;
  }

  switch (sequence) {
    case "gg":
      scrollToTop();
      clearKeySequence();
      break;
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });
};
