import { create } from "zustand";
import { VimMode } from "./vimTypes";
import { VimKeySequenceTimeout } from "../utils/constants";
import { handleNormalMode } from "../modes/normalMode";
import { handleInsertMode } from "../modes/insertMode";
import { handleVisualMode } from "../modes/visualMode";

interface VimState {
  mode: VimMode;
  previousMode: VimMode;
  keySequence: string;
  isRecording: boolean;
  keySequenceTimeoutId: NodeJS.Timeout | null;

  // Mode actions
  setMode: (mode: VimMode) => void;
  enterInsertMode: () => void;
  enterNormalMode: () => void;
  enterVisualMode: () => void;

  // Key handling
  appendToKeySequence: (key: string) => void;
  clearKeySequence: () => void;
}

export const useVimStore = create<VimState>((set, get) => ({
  mode: "NORMAL",
  previousMode: "NORMAL",
  keySequence: "",
  isRecording: false,
  macros: {},
  keySequenceTimeoutId: null,

  setMode: (mode) =>
    set((state) => ({
      mode,
      previousMode: state.mode,
    })),

  enterInsertMode: () => set({ mode: "INSERT" }),
  enterNormalMode: () => set({ mode: "NORMAL" }),
  enterVisualMode: () => set({ mode: "VISUAL" }),

  appendToKeySequence: (key: string) => {
    const currentSequence = get().keySequence + key;
    const mode = get().mode;

    if (get().keySequenceTimeoutId) {
      clearTimeout(get().keySequenceTimeoutId as NodeJS.Timeout);
    }

    switch (mode) {
      case "NORMAL":
        handleNormalMode(key, currentSequence);
        break;
      case "INSERT":
        handleInsertMode(key, currentSequence);
        break;
      case "VISUAL":
        handleVisualMode(key, currentSequence);
        break;
    }

    // Clear sequence after timeout
    const timeoutId = setTimeout(() => {
      //   set({ keySequence: "" });
    }, VimKeySequenceTimeout);

    set({
      keySequence: currentSequence,
      keySequenceTimeoutId: timeoutId,
    });
  },

  clearKeySequence: () => {
    // Remove timeout because sequence was cleared manually
    const { keySequenceTimeoutId } = get();
    if (keySequenceTimeoutId) {
      clearTimeout(keySequenceTimeoutId);
    }
    set({
      keySequence: "",
      keySequenceTimeoutId: null,
    });
  },
}));
