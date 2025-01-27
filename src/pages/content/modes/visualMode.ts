import { useVimStore } from "../store/useVimStore";

export const handleVisualMode = (key: string) => {
  const enterNormalMode = useVimStore.getState().enterNormalMode;

  if (key === "Escape") {
    enterNormalMode();
  }
};
