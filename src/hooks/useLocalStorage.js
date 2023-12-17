import { useState, useEffect } from "react";
import LocalStorage from "@/lib/localstorage";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  useEffect(() => {
    const fromLocal = () => {
      if (typeof window === "undefined") {
        return initialValue;
      }

      try {
        const item = LocalStorage.getItem(key);

        return item !== null ? item : initialValue;
      } catch (error) {
        console.error(error);

        return initialValue;
      }
    };

    setStoredValue(fromLocal);
    setFirstLoadDone(true);
  }, [initialValue, key]);

  useEffect(() => {
    if (!firstLoadDone) {
      return;
    }

    try {
      if (typeof window !== "undefined") {
        LocalStorage.setItem(key, storedValue);
      }
    } catch (error) {
      console.error(error);
    }
  }, [storedValue, firstLoadDone, key]);

  return [storedValue, setStoredValue];
};
