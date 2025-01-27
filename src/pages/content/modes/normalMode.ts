import { useVimStore } from "../store/useVimStore";

export const handleNormalMode = (key: string) => {
  const { enterInsertMode, enterVisualMode, appendToKeySequence } =
    useVimStore.getState();

  appendToKeySequence(key);

  switch (key) {
    case "i":
      enterInsertMode();
      break;
    case "v":
      enterVisualMode();
      break;
  }
};
