import { useEffect } from "react";
import { handleKeyPress } from "./utils/keyHandlers";
import { StatusBar } from "./components/StatusBar";

export function App() {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <StatusBar />
    </>
  );
}
