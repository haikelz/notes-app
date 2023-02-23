import { useCallback, useEffect, useState } from "react";

export const useScroll = () => {
  const [scroll, setScroll] = useState(0);

  const handleScroll = useCallback(() => {
    const position = window.scrollY;
    setScroll(position);
  }, [setScroll]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return scroll;
};
