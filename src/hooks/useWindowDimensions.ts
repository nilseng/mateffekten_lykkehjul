import { useState, useEffect } from "react";

function getWindowDimensions() {
  if (typeof window === "undefined") return { width: undefined, height: undefined };
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    window.screen?.orientation?.addEventListener("change", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.screen?.orientation?.removeEventListener("change", handleResize);
    };
  }, []);

  return windowDimensions;
}
