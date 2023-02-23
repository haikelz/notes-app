import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const browser = typeof window !== "undefined";
const localValue = browser ? localStorage.getItem("theme") : "light";
const systemTheme =
  browser && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
const darkModeAtom = atom(localValue || systemTheme);

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    if (!browser) return;
    localStorage.setItem("darkMode", darkMode);

    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode];
};
