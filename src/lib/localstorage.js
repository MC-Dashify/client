class LocalStorage {
  constructor() {}

  static setItem(key, item) {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, JSON.stringify(item));
  }

  static getItem(key) {
    if (typeof window === "undefined") return null;

    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
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
