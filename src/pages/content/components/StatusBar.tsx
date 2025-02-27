import { useVimStore } from "../store/useVimStore";

export function StatusBar() {
  const { mode, keySequence, clearKeySequence } = useVimStore();

  return (
    <div
      className={`px-2 fixed bottom-0 w-screen left-0 text-lg text-black z-50 flex justify-between ${
        mode === "INSERT"
          ? "bg-green-300"
          : mode === "VISUAL"
          ? "bg-amber-300"
          : "bg-gray-300"
      }`}
    >
      <p className="p-0 m-0" onClick={clearKeySequence}>
        Nvim: {mode}
      </p>
      <p className="p-0 m-0">{keySequence}</p>
    </div>
  );
}
