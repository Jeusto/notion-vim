import { useVimStore } from "../store/useVimStore";
import { toggleCaretStyle } from "../utils/common";

export const handleInsertMode = (key: string, sequence: string) => {
  const { enterNormalMode } = useVimStore.getState();

  if (key === "Escape") {
    enterNormalMode();
    toggleCaretStyle();
  }
};
