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

export const useAsideExpanded = () => {
  const [isExpanded, setIsExpanded] = useLocalStorage(
    "settings.aside.isExpanded",
    true
  );

  return [isExpanded, setIsExpanded];
};

export const useLaungage = () => {
  const [language, setLanguage] = useLocalStorage(
    "settings.appearance.language",
    "ko" // XXX dropdown options를 contants 폴더로 옮겨서 여기로 import하면 key를 쓸 수 있지 않을까
  );

  return [language, setLanguage];
};

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage(
    "settings.appearance.theme",
    "system" // XXX dropdown options를 contants 폴더로 옮겨서 여기로 import하면 key를 쓸 수 있지 않을까
  );

  return [theme, setTheme];
};

export const usePointColor = () => {
  const [pointColor, setPointColor] = useLocalStorage(
    "settings.appearance.pointcolor",
    "blue" // XXX dropdown options를 contants 폴더로 옮겨서 여기로 import하면 key를 쓸 수 있지 않을까
  );

  return [pointColor, setPointColor];
};

export const useHideDomain = () => {
  const [isDomainHidden, setIsDomainHidden] = useLocalStorage(
    "settings.security.hidedomain",
    false // XXX dropdown options를 contants 폴더로 옮겨서 여기로 import하면 key를 쓸 수 있지 않을까
  );

  return [isDomainHidden, setIsDomainHidden];
};
