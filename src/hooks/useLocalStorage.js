import { useState, useEffect, useCallback } from "react";
import LocalStorage from "@/lib/localstorage";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  const setItem = useCallback(
    (value) => {
      if (typeof window !== "undefined") {
        LocalStorage.setItem(key, value);
        window.dispatchEvent(
          new CustomEvent("storage", { detail: { key, newValue: value } })
        );
        // FIXME 로컬 스토리지 변화가 다른 탭에서는 감지되지 않습니다.
        // 첨언: 프로젝트가 사용하는 tauri 버전에서는 여러 프로세스가 열려 있을 경우 서로 스토리지가
        // 충돌하는 문제가 있습니다. https://github.com/tauri-apps/wry/issues/621
      }
    },
    [key]
  );

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
      setItem(storedValue);
    } catch (error) {
      console.error(error);
    }
  }, [storedValue, firstLoadDone, key, setItem]);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.detail && e.detail.key === key) {
        setStoredValue(e.detail.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.dispatchEvent(new Event("storage"));

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setStoredValue];
};

export const useAsideExpanded = () => {
  const [isExpanded, setIsExpanded] = useLocalStorage(
    "settings.aside.isExpanded",
    true
  );

  return [isExpanded, setIsExpanded];
};

// settings.appearance.language는 nextLanuageDetector에 의해 관리됩니다.

export const useTheme = () => {
  // light / dark / system
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
