import { useVimStore } from "../store/useVimStore";
import { handleInsertMode } from "../modes/insertMode";
import { handleNormalMode } from "../modes/normalMode";
import { handleVisualMode } from "../modes/visualMode";

export const handleKeyPress = (e: KeyboardEvent) => {
  const { mode } = useVimStore.getState();
  const key = e.key;

  switch (mode) {
    case "NORMAL":
      handleNormalMode(key);
      break;
    case "INSERT":
      handleInsertMode(key);
      break;
    case "VISUAL":
      handleVisualMode(key);
      break;
  }
};
