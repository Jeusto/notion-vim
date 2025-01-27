import { useVimStore } from "../store/useVimStore";

export const handleInsertMode = (key: string, sequence: string) => {
  const { enterNormalMode } = useVimStore.getState();

  if (key === "Escape") {
    enterNormalMode();
  }
};
