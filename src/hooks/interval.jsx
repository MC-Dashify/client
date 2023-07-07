import { useRef, useEffect } from "react";

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      let interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};
