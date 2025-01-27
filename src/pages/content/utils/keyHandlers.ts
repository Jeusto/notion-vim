import { useVimStore } from "../store/useVimStore";

export const handleKeyPress = (e: KeyboardEvent) => {
  const { appendToKeySequence } = useVimStore.getState();
  appendToKeySequence(e.key);
};
