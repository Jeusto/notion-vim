import { create } from "zustand";
import { VimKeySequenceTimeout, VimMode } from "./vimTypes";

interface VimState {
  mode: VimMode;
  previousMode: VimMode;
  keySequence: string;
  isRecording: boolean;
  macros: Record<string, string[]>;

  // Mode actions
  setMode: (mode: VimMode) => void;
  enterInsertMode: () => void;
  enterNormalMode: () => void;
  enterVisualMode: () => void;

  // Scroll actions
  scrollToTop: () => void;
  scrollToBottom: () => void;

  // Key handling
  appendToKeySequence: (key: string) => void;
  clearKeySequence: () => void;

  // Macro handling
  startRecording: (register: string) => void;
  stopRecording: () => void;
  playMacro: (register: string) => void;
}

export const useVimStore = create<VimState>((set, get) => ({
  mode: "NORMAL",
  previousMode: "NORMAL",
  keySequence: "",
  isRecording: false,
  macros: {},

  scrollToTop: () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },

  scrollToBottom: () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  },

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

    // Handle key sequences
    if (currentSequence === "gg") {
      get().scrollToTop();
      set({ keySequence: "" });
      return;
    }

    if (key === "G") {
      get().scrollToBottom();
      set({ keySequence: "" });
      return;
    }

    // Update key sequence
    set({ keySequence: currentSequence });

    // Clear sequence after timeout
    setTimeout(() => {
      set({ keySequence: "" });
    }, VimKeySequenceTimeout);
  },

  clearKeySequence: () => set({ keySequence: "" }),

  startRecording: (register) => set({ isRecording: true }),

  stopRecording: () => set({ isRecording: false }),

  playMacro: (register) => {
    const macro = get().macros[register];
    if (macro) {
      // Execute stored macro commands
    }
  },
}));
