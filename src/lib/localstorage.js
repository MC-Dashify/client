class LocalStorage {
  constructor() {}

  static setItem(key, item) {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, String(item));
  }

  static getItem(key) {
    if (typeof window === "undefined") return null;

    const data = localStorage.getItem(key);
    if (!data) return null;

    return data;
  }

  static removeItem(key) {
    if (typeof window === "undefined") return;

    localStorage.removeItem(key);
  }

  static clear() {
    if (typeof window === "undefined") return;

    localStorage.clear();
  }
}

export default LocalStorage;
