import { useVimStore } from "../store/useVimStore";

export const handleInsertMode = (key: string) => {
  const enterNormalMode = useVimStore.getState().enterNormalMode;

  if (key === "Escape") {
    enterNormalMode();
  }
};
